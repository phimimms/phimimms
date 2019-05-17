<script>
  import { subscribeToStore } from '.redux';
  import initialState from '.redux/initialState';
  import { decrementCount, incrementCount } from 'actions/count';
  import 'assets/css/foundation.css';
  import { toCapitalized } from 'util/string';

  let count = initialState.count;
  let name = 'world';

  subscribeToStore(
    ({ count }) => ({ newCount: count }),
    ({ newCount }) => {
      count = newCount;
    }
  );
</script>

<div class="App">
  <div class="App__content">
    <h1>Hello {toCapitalized(name)}</h1>
    <input bind:value={name} />

    <input type="button" on:click={decrementCount} value="-" />
    <input type="button" on:click={incrementCount} value="+" />

    <p>{count}</p>
  </div>
</div>

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
