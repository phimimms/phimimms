<style>
  h1 {
    font-weight:  bold;
  }
</style>

<script>
  import { toCapitalized } from 'util/string';

  let name = 'world';
</script>

<h1>Hello {toCapitalized(name)}</h1>
<input bind:value={name} />
