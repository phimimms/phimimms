<script>
  import { createEventDispatcher } from 'svelte';

  export let isDisabled = false;
  export let label;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch('click');
  }
</script>

<div class={`${isDisabled ? 'is-disabled': ''}`} on:click={!isDisabled ? onClick : undefined}>
  {label}
</div>

<style>
  div {
    align-items:      center;
    background-color: var(--primary-color);
    border-radius:    var(--small--3x);
    color:            var(--light-color);
    cursor:           pointer;
    display:          inline-flex;
    height:           var(--medium--2x);
    justify-content:  center;
    user-select:      none;
    width:            var(--large--3x);
  }

  div.is-disabled {
    background-color: var(--disabled-color);
    cursor:           default;
  }
</style>
