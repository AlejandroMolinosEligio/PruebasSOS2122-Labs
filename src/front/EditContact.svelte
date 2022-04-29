<script>
    import { onMount } from 'svelte';
    export let params = {};
    import { pop } from "svelte-spa-router";
    import { Table,Button } from "sveltestrap";
    
    onMount(getContact);

    let contact = {};

    let updatedName;
    let updatedPhone;
    let updatedEmail;
    
    

    async function getContact(){
        console.log("Fetching contacts....");
        const res = await fetch("/api/v1/contacts/"+params.contactName); 
        if(res.ok){
            const data = await res.json();
            contact = data;
            updatedName = contact.name;
            updatedEmail = contact.email;
            updatedPhone = contact.phone;
            
            console.log("Received contact.");
        }
    }

    async function editContact(){
    }
</script>

<main>
    <h1>Edit contact "{params.contactName}" </h1>
    {#await contact}
    loading
        {:then contact}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{updatedName}"></td>
                    <td><input bind:value="{updatedEmail}"></td>
                    <td><input bind:value="{updatedPhone}"></td>
                    <td><Button 
                            outline 
                            color="primary" 
                            on:click="{editContact}">
                        Edit
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Back</Button>

    </main>