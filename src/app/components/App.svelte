<style>
  .App {
    background:       linear-gradient(135deg, var(--secondary-background-color), var(--primary-background-color));
    background-color: var(--secondary-background-color);
    height:           100%;
    width:            100%;
  }

  .App__content {
    background-color: var(--text-background-color);
    color:            var(--dark-color);
    padding:          var(--medium);
  }

  h1 {
    font-weight:    bold;
    margin:         0;
    padding-bottom: var(--small);
  }
</style>

<script>
  import 'assets/css/foundation.css';
  import { toCapitalized } from 'util/string';

  let name = 'world';
</script>

<div class="App">
  <div class="App__content">
    <h1>Hello {toCapitalized(name)}</h1>
    <input bind:value={name} />
  </div>
</div>
