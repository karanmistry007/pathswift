import { FrappeProvider } from 'frappe-react-sdk'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { Toaster } from "sonner"
import ShortLink from '@/pages/short-link';


const App = () => {

	//? GET SITE NAME
	const getSiteName = () => {
		// @ts-ignore
		if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith("15") || window.frappe.boot.versions.frappe.startsWith("16"))) {
			// @ts-ignore
			return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
		}
		return import.meta.env.VITE_SITE_NAME;
	};

	return (
		<div className="App">
			<FrappeProvider
				socketPort={import.meta.env.VITE_SOCKET_PORT}
				siteName={getSiteName()}
				enableSocket={false}
			>

				<Router basename="/">
					<Routes>
						<Route
							path="/links"
							element={<ShortLink />}
						/>
					</Routes>
				</Router>


				<Toaster richColors />
			</FrappeProvider>
		</div>
	)
}

export default App
