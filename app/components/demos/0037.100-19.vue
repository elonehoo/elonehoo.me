<script setup lang="ts">
const formRef = ref<HTMLFormElement | null>(null)

formRef.value?.addEventListener('submit', (event) => {
  event.preventDefault()
})
</script>

<template>
  <CraftBox>
    <form ref="formRef" action="#">
      <div class="error-email-form-group">
        <label for="input">
          <span style="--char-index: 0;" aria-hidden="true">E</span>
          <span style="--char-index: 1;" aria-hidden="true">m</span>
          <span style="--char-index: 2;" aria-hidden="true">a</span>
          <span style="--char-index: 3;" aria-hidden="true">i</span>
          <span style="--char-index: 4;" aria-hidden="true">l</span>
          <span class="sr-only">Email</span>
        </label>
        <input type="email" required>
      </div>
    </form>
  </CraftBox>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.error-email-form-group {
  --valid: hsl(145 50% 55%);
  --invalid: hsl(15 80% 55%);
  --transition: 0.2s;
  --color: hsl(268 1% 55%);
  display: grid;
  gap: 0.5rem;
}

label {
  display: flex;
  color: var(--color);
  transition: color var(--transition);
  letter-spacing: 0.1ch;
  padding-left: 0.5rem;
  font-weight: bold;
}

label > [aria-hidden] {
  animation-duration: 0.2s;
  animation-delay: calc(var(--char-index) * 0.1s);
  animation-fill-mode: both;
  animation-timing-function: ease-in;
}

@keyframes jump {
  50% {
    translate: 0 -50%;
  }
}

@keyframes shake {
  25% {
    translate: 0.25ch 0;
  }
  75% {
    translate: -0.25ch 0;
  }
}

input {
  --at-apply: dark:text-dark text-light;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--color);
  transition: border var(--transition);
}

.error-email-form-group:has(:user-valid) {
  --color: var(--valid);
}

.error-email-form-group:not(:focus-within):has(:user-invalid) {
  --color: var(--invalid);
}

@media (prefers-reduced-motion: no-preference) {
  .error-email-form-group:not(:focus-within):has(:user-valid) [aria-hidden] {
    animation-name: jump;
  }

  .error-email-form-group:not(:focus-within):has(:user-invalid) label {
    animation: shake 0.075s 8;
  }
}
</style>
