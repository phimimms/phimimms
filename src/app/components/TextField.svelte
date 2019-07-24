<script lang="typescript">
  import { createEventDispatcher, onMount } from 'svelte';
  import uuid from 'uuid/v4';

  const dispatch = createEventDispatcher();

  const id = `TextField__${uuid()}`;

  export let disabled: boolean = false;
  export let label: string = '';
  export let value: string = '';

  let inputElement: HTMLInputElement;

  onMount(() => {
    inputElement.value = value;
  });

  function onChange({ target: { value: newValue } }: { target: { value: string } }) {
    if (disabled) {
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
<input
  bind:this={inputElement}
  id={id}
  type="text"
  on:input={onChange}
  />
