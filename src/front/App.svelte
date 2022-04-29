<script>
	import Router from "svelte-spa-router"
	import ContactsTable from './ContactsTable.svelte';
	import Home from './Home.svelte';
	import EditContact from "./EditContact.svelte";
	import MyGraph from "./MyGraph.svelte";

	const routes ={

		"/": Home,
		"/contactList": ContactsTable,
		"/contact/:contactName": EditContact,
		"/graph": MyGraph
	};

</script>

<main>
	<h1>Contact Manager</h1>
	<Router {routes} />
</main>
