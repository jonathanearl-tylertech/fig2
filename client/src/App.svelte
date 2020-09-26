<script>
  import { Router, Link, Route } from "svelte-routing";
	import Friends from "./components/friends-feed.svelte";
	import Search from './components/search.svelte';

  export let url = "";
</script>

<div>
	<Router url="{url}">
		<main>
			<Route path="search" component="{Search}"></Route>
			<Route path="/"><Friends /></Route>
		</main>
		<nav>
			<ul>
				<li><Link to="search">Search</Link></li>
				<li><Link to="/">Friends Feed</Link></li>
				<li><Link to="search">Search</Link></li>
				<li><Link to="/">Friends Feed</Link></li>
				<li><Link to="/">Friends Feed</Link></li>
				<li><Link to="search">Search</Link></li>
			</ul>
		</nav> 
	</Router>
</div>


<style>
	:global(body) {
		padding: 0;
	}

	div {
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	nav {
		width: 100%;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		width: 100%;
	}

	li {
		height: 90px;
		width: calc(100vw/5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>