<script lang="typescript">
  import { createEventDispatcher } from 'svelte';

  export let disabled: boolean = false;
  export let label: string;

  const dispatch = createEventDispatcher();
</script>

<div class:disabled on:click={!disabled ? () => dispatch('click', null) : undefined}>
  {label}
</div>

<style lang="scss">
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

    &.disabled {
      background-color: var(--disabled-color);
      cursor:           default;
    }
  }
</style>
