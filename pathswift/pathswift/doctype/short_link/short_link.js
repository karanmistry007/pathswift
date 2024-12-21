// Copyright (c) 2024, Karan Mistry and contributors
// For license information, please see license.txt

frappe.ui.form.on("Short Link", {
    refresh(frm) {

        // ? ADD PREVIEW LINK BUTTON
        addPreviewLinkButton(frm);

    },
});


// ? FUNCTION TO ADD PREVIEW LINK BUTTON
function addPreviewLinkButton(frm) {
    // ? VARIABLES
    const redirectURL = `${window.location.origin}/${frm.doc.short_link}`;

    // ? ADD THE PREVIEW LINK BUTTON
    frm.add_custom_button("Preview Link", () => window.open(redirectURL, '_blank'));
}
