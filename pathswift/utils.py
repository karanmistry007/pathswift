import frappe
from frappe.website.path_resolver import resolve_path as original_resolve_path
import json
from urllib.parse import parse_qs, urlparse


# ? Extract UTM parameters from the Referer URL
def extract_utm(referrer):
    return {
        key: value[0]
        for key, value in parse_qs(urlparse(referrer).query).items()
        if key.startswith("utm_")
    }


# ! pathswift.utils.handle_path_redirect
# ? PATH RESOLVER FUNCTION
def handle_path_redirect(path: str):

    # TODO: NOT HANDLING WITH QUERY PERMS PROPERLY
    # ? CHECK IF THE PATH IS THERE IN ACTIVE SHORT LINK OR NOT
    if frappe.db.exists(
        "Short Link",
        {
            "short_link": path,
            "status": "Active",
        },
    ):
        # ? GET SHORT LINK DOC VALUES
        short_link_doc = frappe.db.get_value(
            "Short Link",
            {
                "short_link": path,
                "status": "Active",
            },
            ["name", "destination_url"],
            as_dict=1,
        )

        # ? GET REQUEST HEADERS DATA
        request_headers = frappe.request.headers

        # ? ADD RECORD TO SHORT LINK CLICK AND SUBMIT IT
        short_link_click_doc = frappe.get_doc(
            {
                "doctype": "Short Link Click",
                "short_link": short_link_doc.get("name"),
                "ip": request_headers.get("X-Real-Ip") or frappe.local.request_ip,
                "user_agent": request_headers.get("User-Agent"),
                "referrer": request_headers.get("Referer"),
                "utm": (
                    json.dumps(extract_utm(request_headers.get("Referer")))
                    if extract_utm(request_headers.get("Referer"))
                    else None
                ),
                "cookie": request_headers.get("Cookie"),
            }
        )
        short_link_click_doc.insert()
        short_link_click_doc.submit()
        frappe.db.commit()

        # ? REDIRECT TO THE DESTINATION URL
        frappe.redirect(short_link_doc.get("destination_url"))

    # ? REDIRECT TO DEFAULT PATH
    return original_resolve_path(path)
