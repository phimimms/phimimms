<script>
  import { subscribeToStore } from '.redux';
  import initialState from '.redux/initialState';
  import { decrementCount, incrementCount } from 'actions/count';
  import 'assets/css/foundation.css';
  import Button from 'components/Button';
  import TextField from 'components/TextField';
  import { toCapitalized } from 'util/string';

  let { count } = initialState;
  let name = 'world';

  subscribeToStore(
    ({ count: newCount }) => ({ newCount }),
    ({ newCount }) => {
      count = newCount;
    }
  );

  function onNameChange({ detail: { value } }) {
    name = value;
  }
</script>

<div class="App">
  <div class="App__content">
    <h1>Hello {toCapitalized(name)}</h1>
    <TextField value={name} on:change={onNameChange} />

    <Button label="-" on:click={decrementCount} />
    <Button label="+" on:click={incrementCount} />

    <p>The total is {count}</p>
  </div>
</div>

<style lang="scss">
  .App {
    background:       linear-gradient(135deg, var(--secondary-background-color), var(--primary-background-color));
    background-color: var(--secondary-background-color);
    font-family:      'Roboto', 'Helvetica', 'Arial', sans-serif;
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
