<script>
  import {
    Button,
    TextInput,
    DateInput,
    TextareaInput,
    Dialog,
    Clipboard,
    LoadingAlert,
    ErrorAlert,
    FormDialog,
    SelectMenu,
    SelectMenuEditDialog,
    DropdownMenu,
    TextEditDialog,
    DateEditDialog,
    TextareaEditDialog,
    ToggleInput,
    Tooltip,
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
  import { successToast } from '../../utils/toast'

  let dialog
  let formDialog
  let editDialog
  let editMenuDialog
  let editDateDialog
  let editToggleDialog
  let confirmationDialog

  const sampleMutation = createMutation(fakeFetch, {
    onSuccess: () => {
      successToast('Successfully edited something')
      setTimeout(() => {
        onClose()
      })
    }
  })

  const { form, errors, touched, handleChange, handleReset, handleSubmit } = createForm({
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
      dob: new Date(),
      createdAt: new Date(),
      selectValue: 'apple',
      editableText: 'Editable text'
    },
    onSubmit: () => {
      $sampleMutation.mutate()
    }
  })

  const onClose = () => {
    handleReset()
    $sampleMutation.reset()
    formDialog.hide()
    editDialog.hide()
    editMenuDialog.hide()
    editDateDialog.hide()
    editToggleDialog.hide()
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
    <Button color="green" style="ghost">green ghost Button</Button>

    <Button color="red" size="lg">red primary Button large</Button>
    <Button color="blue" size="sm" style="secondary">blue secondary Button small</Button>
    <Button color="gray" style="outline">gray outline Button</Button>
    <Button href="#" style="outline">blue Link Button</Button>
    <Button color="red" isDisabled>red disabled Button</Button>
    <Button color="green" href="#" isDisabled>green disabled Link</Button>
    <LoadingAlert>Loading alert text...</LoadingAlert>
    <ErrorAlert>Error alert text...</ErrorAlert>
    <TextInput
      name="fullName"
      isTouched={$touched['fullName']}
      value={$form['fullName']}
      error={$errors['fullName']}
      on:change={handleChange}
      on:keyup={handleChange}
      class="max-w-fit"
    />
    <DateInput
      name="dob"
      label="Date of Birth"
      isTouched={$touched['dob']}
      value={$form['dob']}
      error={$errors['dob']}
      on:change={handleChange}
      class="max-w-fit"
    />
    <Button
      on:click={() => {
        $form['dob'] = ''
      }}
    >
      today date
    </Button>

    <TextInput
      name="fullName"
      isTouched={$touched['fullName']}
      value={$form['fullName']}
      error={$errors['fullName']}
      on:keyup={handleChange}
      color="green"
      placeholder="red"
      class="max-w-fit"
    >
      <span slot="label">Full Name</span>
      <DropdownMenu
        let:menuItemProps
        let:triggerProps
        color="green"
        let:onOpen
        placement="bottom-left"
      >
        <Button
          slot="trigger"
          on:click={onOpen}
          {...triggerProps}
          color="green"
          style="outline"
          class="p-0"
        >
          <ChevronDownIcon />
        </Button>
        <div slot="content" class="min-w-[12rem]">
          <div class="mb-1 divide-y divide-gray-100" role="none">
            <a {...menuItemProps} href="/">Home</a>
            <a href="/playground" {...menuItemProps}>Playground</a>
          </div>
        </div>
      </DropdownMenu>
    </TextInput>

    <Clipboard text="Your Text Need to Copy" />
    <ToggleInput
      name="toggle"
      isTouched={$touched['toggle']}
      value={$form['toggle']}
      error={$errors['toggle']}
      on:change={handleChange}
      on:keyup={handleChange}
      color="yellow"
    />
    <ToggleInput
      name="toggle"
      isTouched={$touched['toggle']}
      value={$form['toggle']}
      error={$errors['toggle']}
      on:change={handleChange}
      on:keyup={handleChange}
      color="green"
    >
      <DropdownMenu
        let:menuItemProps
        let:triggerProps
        color="green"
        let:onOpen
        placement="bottom-left"
      >
        <Button
          slot="trigger"
          on:click={onOpen}
          {...triggerProps}
          color="green"
          style="outline"
          class="ml-2 p-0"
        >
          <ChevronDownIcon />
        </Button>
        <div slot="content" class="min-w-[12rem]">
          <div class="mb-1 divide-y divide-gray-100" role="none">
            <a {...menuItemProps} href="/">Home</a>
            <a href="/playground" {...menuItemProps}>Playground</a>
          </div>
        </div>
      </DropdownMenu>
    </ToggleInput>

    <TextInput
      name="fullName"
      isTouched={$touched['fullName']}
      value={$form['fullName']}
      error={$errors['fullName']}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
    <TextInput
      name="fullName"
      isTouched={$touched['fullName']}
      value={$form['fullName']}
      error={$errors['fullName']}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <Button on:click={dialog.show}>open dialog</Button>
    <Button on:click={formDialog.show}>open form dialog</Button>
    <Button on:click={confirmationDialog.show} color="red" style="outline"
      >delete confirm dialog</Button
    >

    <SelectMenu
      value={$form['selectValue']}
      error={$errors['selectValue']}
      on:select={(option) => {
        $form['selectValue'] = option.value
      }}
      class="max-w-fit py-0"
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

    <SelectMenuEditDialog
      value={$form['selectValue']}
      error={$errors['selectValue']}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
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
      mutation={sampleMutation}
      bind:dialog={editMenuDialog}
    />

    <TextEditDialog
      name="editableText"
      color="green"
      value={$form['editableText']}
      error={$errors['editableText']}
      isTouched={$touched['editableText']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text"
      bind:dialog={editDialog}
    />
    <TextEditDialog
      inline
      color="green"
      name="editableText"
      value={$form['editableText']}
      error={$errors['editableText']}
      isTouched={$touched['editableText']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text"
      bind:dialog={editDialog}
    />
    <DateEditDialog
      type="datetime"
      name="createdAt"
      value={$form['createdAt']}
      error={$errors['createdAt']}
      isTouched={$touched['createdAt']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable date"
      bind:dialog={editDateDialog}
    />
    <TextareaEditDialog
      name="editableText"
      value={$form['editableText']}
      error={$errors['editableText']}
      isTouched={$touched['editableText']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text area"
      bind:dialog={editDialog}
    />
    <ToggleEditDialog
      name="toggle"
      class="max-w-xs"
      value={$form['toggle']}
      error={$errors['toggle']}
      isTouched={$touched['toggle']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text area"
      bind:dialog={editToggleDialog}
    />
    <ToggleEditDialog
      inline
      class="max-w-xs"
      name="toggle"
      value={$form['toggle']}
      error={$errors['toggle']}
      isTouched={$touched['toggle']}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text area"
      bind:dialog={editToggleDialog}
    />
    <div class="flex flex-1 gap-2">
      <DropdownMenu
        let:menuItemProps
        let:triggerProps
        color="green"
        let:onOpen
        placement="top-center"
        class="mb-12"
      >
        <Button slot="trigger" on:click={onOpen} {...triggerProps} color="green" style="outline">
          <span>Open Menu</span>
          <ChevronDownIcon class="ml-2 -mr-1" aria-hidden="true" />
        </Button>
        <div slot="content" class="min-w-[12rem]">
          <div class="mb-1 divide-y divide-gray-100" role="none">
            <a {...menuItemProps} href="/">Home</a>
            <a href="/playground" {...menuItemProps}>Playground</a>
          </div>
        </div>
      </DropdownMenu>
      <DropdownMenu
        let:menuItemProps
        let:triggerProps
        color="green"
        let:onOpen
        placement="bottom-left"
      >
        <Button
          slot="trigger"
          on:click={onOpen}
          {...triggerProps}
          color="green"
          style="outline"
          class="p-0"
        >
          <ChevronDownIcon />
        </Button>
        <div slot="content" class="min-w-[12rem]">
          <div class="mb-1 divide-y divide-gray-100" role="none">
            <a {...menuItemProps} href="/">Home</a>
            <a href="/playground" {...menuItemProps}>Playground</a>
          </div>
        </div>
      </DropdownMenu>
    </div>
    <Button class="" color="green" size="sm" style="outline"><PencilSquareIcon /></Button>
    <Tooltip tip="view on github">
      <Button class="max-w-fit" color="red" size="sm" style="primary"><TrashIcon /></Button>
    </Tooltip>
    <Button class="max-w-fit" color="blue" size="sm" style="outline"><PlusIcon /></Button>
    <Button class="max-w-fit" color="yellow" size="sm" style="outline"
      ><ClipboardDocumentIcon /></Button
    >
    <TextInput
      name="password"
      type="password"
      placeholder="password"
      class="max-w-fit"
      isTouched={$touched['password']}
      value={$form['password']}
      error={$errors['password']}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <TextInput
      name="age"
      type="number"
      placeholder="number"
      isTouched={$touched['age']}
      value={$form['age']}
      error={$errors['age']}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <TextareaInput
      name="notes"
      placeholder="textarea"
      isTouched={$touched['notes']}
      value={$form['notes']}
      error={$errors['notes']}
      on:change={handleChange}
      on:keyup={handleChange}
    />
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
  bind:dialog={confirmationDialog}
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
  bind:dialog={formDialog}
  title="Form dialog title"
  error={$sampleMutation?.error?.message}
  isLoading={$sampleMutation.isLoading}
  on:close={onClose}
>
  <div class="flex flex-col gap-8">
    <TextInput
      type="password"
      label="Password"
      name="password"
      isTouched={$touched['password']}
      value={$form['password']}
      error={$errors['password']}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
    <TextInput
      type="password"
      label="Confirm Password"
      name="confirmPassword"
      isTouched={$touched['confirmPassword']}
      value={$form['confirmPassword']}
      error={$errors['confirmPassword']}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
  </div>
</FormDialog>
