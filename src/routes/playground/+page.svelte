<script>
  import {
    Button,
    TextInput,
    TextareaInput,
    Dialog,
    Clipboard,
    FormDialog,
    SelectMenu,
    DropdownMenu,
    TextEditDialog,
    TextareaEditDialog,
    ToggleInput,
    ToggleEditDialog,
    ConfirmationDialog
  } from '$lib'
  import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'
  import TrashIcon from '$lib/icons/TrashIcon.svelte'
  import PlusIcon from '$lib/icons/PlusIcon.svelte'
  import ClipboardDocumentIcon from '$lib/icons/ClipboardDocumentIcon.svelte'

  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import { createMutation } from '@tanstack/svelte-query'
  import fakeFetch from '$lib/utils/fakeFetch'
  import { successToast } from '$lib/utils/toast'

  let dialog
  let formDialog
  let editDialog
  let editDateDialog
  let editToggleDialog
  let confirmationDialog

  const sampleMutation = createMutation(fakeFetch, {
    onSuccess: (data) => {
      console.log(data)
      successToast('Successfully reset your password')
      onClose()
    }
  })

  const formLib = createForm({
    validationSchema: yup.object().shape({
      fullName: yup.string().required().min(3),
      age: yup.number().typeError('Age must be a number').required().min(18),
      dob: yup.date().typeError('dob must be a date').required(),
      createdAt: yup.date().typeError('createdAt must be a date').required(),
      toggle: yup.boolean().required(),
      notes: yup.string().min(3),
      password: yup.string().required().min(3),
      confirmPassword: yup
        .string()
        .required()
        .min(3)
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
      selectValue: yup.string().required()
    }),
    initialValues: {
      dob: '2021-01-01',
      createdAt: '2021-01-01 00:00:00'
    },
    onSubmit: () => {
      $sampleMutation.mutate()
    }
  })

  const formLibEditable = createForm({
    validationSchema: yup.object().shape({
      editableText: yup.string().required().min(3),
      toggle: yup.boolean().required()
    }),
    initialValues: {
      editableText: 'Editable text value'
    },
    onSubmit: () => {
      $sampleMutation.mutate()
    }
  })

  const onClose = () => {
    formLib.handleReset()
    formLibEditable.handleReset()
    $sampleMutation.reset()
    formDialog.hide()
    editDialog.hide()
    editDateDialog.hide()
  }
</script>

<div class="h-screen px-4">
  <Button href="/" size="sm" style="outline" class="mt-2 max-w-fit">
    <span class="mr-1" aria-hidden="true">&larr;</span>
    <span class="">Home</span>
  </Button>

  <div class="mt-4 flex flex-wrap gap-8">
    <Button>blue primary Button</Button>
    <Button color="yellow" style="secondary" isLoading class="max-w-fit"
      >yellow secondary loading Button</Button
    >
    <Button color="green" style="outline">green outline Button</Button>
    <Button color="red" size="lg">red primary Button large</Button>
    <Button color="blue" size="sm" style="secondary">blue secondary Button small</Button>
    <Button color="gray" style="outline">gray outline Button</Button>
    <Button href="#" style="outline">blue Link Button</Button>
    <Button color="red" isDisabled>red disabled Button</Button>
    <Button color="green" href="#" isDisabled>green disabled Link</Button>
    <TextInput name="fullName" {formLib} class="max-w-fit" />
    <TextInput name="fullName" {formLib} color="green" placeholder="red" class="max-w-fit" />
    <TextInput name="dob" {formLib} color="green" type="date" class="max-w-fit" />
    <Clipboard text="Your Text Need to Copy" />
    <ToggleInput name="toggle" {formLib} color="yellow" />
    <ToggleInput name="toggle" {formLib} color="green" inline />

    <TextInput name="fullName" {formLib} isRequired placeholder="required field" />
    <TextInput name="fullName" {formLib} />
    <Button on:click={dialog.show}>open dialog</Button>
    <Button on:click={formDialog.show}>open form dialog</Button>
    <Button on:click={confirmationDialog.show} color="red" style="outline"
      >delete confirm dialog</Button
    >

    <SelectMenu
      {formLib}
      class="max-w-fit"
      name="selectValue"
      color="yellow"
      isRequired
      label="Select menu"
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pineapple', value: 'pineapple' },
        { label: 'Strawberry', value: 'strawberry' },
        { label: 'Watermelon', value: 'watermelon' },
        { label: 'Monkey', value: 'monkey' },
        { label: 'Money', value: 'money' },
        { label: 'Dog', value: 'dog' }
      ]}
    />
    <TextEditDialog
      name="editableText"
      color="green"
      formLib={formLibEditable}
      label="Editable text"
      mutation={sampleMutation}
      bind:editDialog
    />
    <TextEditDialog
      inline
      color="green"
      name="editableText"
      formLib={formLibEditable}
      label="Editable text"
      mutation={sampleMutation}
      bind:editDialog
    />
    <TextEditDialog
      type="datetime-local"
      name="createdAt"
      {formLib}
      label="Editable date"
      mutation={sampleMutation}
      bind:editDateDialog
    />
    <TextareaEditDialog
      name="editableText"
      formLib={formLibEditable}
      label="Editable text area"
      mutation={sampleMutation}
      bind:editDialog
    />
    <ToggleEditDialog
      name="toggle"
      class="max-w-xs"
      formLib={formLibEditable}
      label="Editable text area"
      mutation={sampleMutation}
      bind:editToggleDialog
    />
    <ToggleEditDialog
      inline
      class="max-w-xs"
      name="toggle"
      formLib={formLibEditable}
      label="Editable text area"
      mutation={sampleMutation}
      bind:editToggleDialog
    />
    <DropdownMenu let:menuItemProps let:triggerProps color="green" placement="left" let:onOpen>
      <Button slot="trigger" on:click={onOpen} {...triggerProps} color="green" style="outline"
        >Open Menu
        <ChevronDownIcon class="ml-2 -mr-1" aria-hidden="true" />
      </Button>
      <div slot="content" class="min-w-[12rem]">
        <div class="divide-y divide-gray-100" role="none">
          <a {...menuItemProps} href="/">Home</a>
          <a href="/playground" {...menuItemProps}>Playground</a>
        </div>
      </div>
    </DropdownMenu>
    <Button class="max-w-fit" color="green" size="sm" style="outline"><PencilSquareIcon /></Button>
    <Button class="max-w-fit" color="red" size="sm" style="primary"><TrashIcon /></Button>
    <Button class="max-w-fit" color="blue" size="sm" style="outline"><PlusIcon /></Button>
    <Button class="max-w-fit" color="yellow" size="sm" style="outline"
      ><ClipboardDocumentIcon /></Button
    >
    <TextInput name="password" type="password" placeholder="password" class="max-w-fit" {formLib} />
    <TextInput name="age" type="number" placeholder="number" {formLib} />
    <TextareaInput name="notes" placeholder="textarea" {formLib} />
  </div>
</div>

<Dialog bind:dialog>
  <h2 slot="header" class="text-xl font-semibold text-gray-900">Dialog title</h2>

  <div slot="content">
    <p class="text-gray-500">Some content.</p>
  </div>

  <div slot="footer" class="flex justify-end gap-4">
    <Button on:click={dialog.hide} style="outline">close</Button>
    <Button>blue primary Button</Button>
  </div>
</Dialog>

<ConfirmationDialog
  title="Are you sure you want to delete this item?"
  mutation={sampleMutation}
  bind:confirmationDialog
  on:close={() => {
    confirmationDialog.hide()
  }}
  on:confirm={() => {
    confirmationDialog.hide()
  }}
>
  <div slot="content">
    <p class="text-gray-500">Some content.</p>
  </div>
</ConfirmationDialog>

<FormDialog
  bind:formDialog
  title="Form dialog title"
  {formLib}
  mutation={sampleMutation}
  on:close={onClose}
>
  <div class="flex flex-col gap-8">
    <TextInput
      type="password"
      label="Password"
      name="password"
      {formLib}
      isRequired
      placeholder="required field"
    />
    <TextInput
      type="password"
      label="Confirm Password"
      name="confirmPassword"
      {formLib}
      isRequired
      placeholder="required field"
    />
  </div>
</FormDialog>
