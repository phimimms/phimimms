<script>
  import { subscribeToStore } from '.redux';
  import { initialState } from '.redux/state';
  import 'assets/css/foundation.css';

  let { settings: { uiTheme } } = initialState;

  subscribeToStore(
    ({ settings: { uiTheme: newUITheme } }) => ({ newUITheme }),
    ({ newUITheme }) => {
      uiTheme = newUITheme;
    }
  );
</script>

<div class={`App theme--${uiTheme}`}>
</div>

<style lang="scss">
  .App {
    background:       linear-gradient(135deg, var(--secondary-background-color), var(--primary-background-color));
    background-color: var(--secondary-background-color);
    font-family:      'Roboto', 'Helvetica', 'Arial', sans-serif;
    height:           100%;
    width:            100%;
  }
</style>
