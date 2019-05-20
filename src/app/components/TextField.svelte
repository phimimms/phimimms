<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import uuid from 'uuid/v4';

  const dispatch = createEventDispatcher();

  const id = `TextField__${uuid()}`;

  export let isDisabled = false;
  export let label = '';
  export let value = '';

  let inputElement;

  onMount(() => {
    inputElement.value = value;
  });

  function onChange({ target: { value: newValue } }) {
    if (isDisabled) {
      inputElement.value = value;

      return;
    }

    value = newValue;
    dispatch('change', { value });
  }
</script>

{#if label}
<label for={id}>{label}</label>
{/if}
<input bind:this={inputElement} id={id} type="text" on:input={onChange} />
