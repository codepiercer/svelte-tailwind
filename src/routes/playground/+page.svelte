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
    SelectInput,
    SelectInputEditDialog,
    MultiSelectInput,
    MultiSelectInputEditDialog,
    DropdownMenu,
    TextEditDialog,
    DateEditDialog,
    TextareaEditDialog,
    ToggleInput,
    ToggleEditDialog,
    ConfirmationDialog
  } from "$lib"
  import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte"
  import PencilSquareIcon from "$lib/icons/PencilSquareIcon.svelte"
  import TrashIcon from "$lib/icons/TrashIcon.svelte"
  import PlusIcon from "$lib/icons/PlusIcon.svelte"
  import ClipboardDocumentIcon from "$lib/icons/ClipboardDocumentIcon.svelte"

  import SelectInputFetchData from "./components/SelectInputFetchData.svelte"

  import { createForm } from "svelte-forms-lib"
  import * as yup from "yup"
  import { createMutation } from "@tanstack/svelte-query"
  import fakeFetch from "$lib/utils/fakeFetch"
  import { successToast } from "../../utils/toast"

  import { Toaster } from "svelte-french-toast"

  let dialog
  let formDialog
  let editDialog
  let editMenuDialog
  let editDateDialog
  let editToggleDialog
  let confirmationDialog

  const sampleMutation = createMutation(fakeFetch, {
    onSuccess: () => {
      successToast(`Successfully edited something`)
      setTimeout(() => {
        onClose()
      })
    }
  })

  const { form, errors, touched, handleChange, handleReset, handleSubmit } = createForm({
    validationSchema: yup.object().shape({
      fullName: yup.string().required().min(3),
      color: yup.string(),
      age: yup.number().typeError(`Age must be a number`).required().min(18),
      dob: yup.date().typeError(`dob must be a date`).required(),
      createdAt: yup.date().typeError(`createdAt must be a date`).required(),
      toggle: yup.boolean().required(),
      notes: yup.string().min(3),
      password: yup.string().required().min(3),
      confirmPassword: yup
        .string()
        .required()
        .min(3)
        .oneOf([yup.ref(`password`), null], `Passwords must match`),
      selectValue: yup.string().required(),
      selectValues: yup.array().of(yup.string()),
      editableText: yup.string().required().min(3)
    }),
    initialValues: {
      color: `#ff0000`,
      createdAt: `2023-02-27T00:00:00.000`,
      selectValue: `apple`,
      selectValues: [`apple`, `orange`],
      editableText: `Editable text`
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
  <div class="flex flex-wrap gap-8">
    <Button href="/" size="sm" variant="outlined" class="mt-2 max-w-full">
      <span class="mr-1" aria-hidden="true">&larr;</span>
      <span class="">Home</span>
    </Button>
  </div>
  <div class="mt-4 flex flex-wrap gap-8">
    <Button class="max-w-full" color="red" size="sm" variant="primary"><TrashIcon /></Button>
    <Button>blue primary Button</Button>
    <Button color="yellow" variant="secondary" isLoading class="">yellow secondary loading</Button>
    <Button color="green" variant="outlined">green outline Button</Button>
    <Button color="gray" variant="outlined">gray outline Button</Button>

    <Button color="green" variant="ghost">green ghost Button</Button>

    <Button color="red" size="lg">red primary Button large</Button>
    <Button color="blue" size="sm" variant="secondary">blue secondary Button small</Button>
    <Button href="#" variant="outlined">blue Link Button</Button>
    <Button color="red" isDisabled>red disabled Button</Button>
    <Button color="green" href="#" isDisabled>green disabled Link</Button>
    <LoadingAlert>Loading alert text...</LoadingAlert>
    <ErrorAlert>Error alert text...</ErrorAlert>
    <TextInput
      name="fullName"
      label="CC Number"
      isTouched={$touched[`fullName`]}
      value={$form[`fullName`]}
      error={$errors[`fullName`]}
      on:stopTyping={handleChange}
      class="max-w-full"
      mask="0000-0000-0000-0000"
    />
    <TextInput
      type="color"
      name="color"
      label="Color"
      isTouched={$touched[`color`]}
      value={$form[`color`]}
      error={$errors[`color`]}
      on:stopTyping={handleChange}
      class="min-w-[8rem] max-w-full"
    />
    <DateInput
      isInline
      noClear
      isRequired
      name="dob"
      type="date"
      label="Date of Birth"
      isTouched={$touched[`dob`]}
      value={$form[`dob`]}
      error={$errors[`dob`]}
      on:pickDate={(e) => {
        console.log(e.detail)
        $form[`dob`] = e.detail.date
      }}
      class="min-w-[16rem]"
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
          color="green"
          variant="outlined"
          class="p-0"
          {...triggerProps}
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
    </DateInput>
    <Button
      on:click={() => {
        $form[`dob`] = ``
      }}
    >
      today date
    </Button>

    <TextInput
      name="fullName"
      isTouched={$touched[`fullName`]}
      value={$form[`fullName`]}
      error={$errors[`fullName`]}
      on:keyup={handleChange}
      color="green"
      placeholder="red"
      class="max-w-full"
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
          color="green"
          variant="outlined"
          class="p-0"
          {...triggerProps}
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
      isTouched={$touched[`toggle`]}
      value={$form[`toggle`]}
      error={$errors[`toggle`]}
      on:change={handleChange}
      on:keyup={handleChange}
      color="yellow"
    />
    <ToggleInput
      name="toggle"
      isTouched={$touched[`toggle`]}
      value={$form[`toggle`]}
      error={$errors[`toggle`]}
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
          color="red"
          variant="outlined"
          class="!ml-2 !p-0"
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
      isTouched={$touched[`fullName`]}
      value={$form[`fullName`]}
      error={$errors[`fullName`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
    <TextInput
      name="fullName"
      isTouched={$touched[`fullName`]}
      value={$form[`fullName`]}
      error={$errors[`fullName`]}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <Button on:click={dialog.show}>open dialog</Button>
    <Button on:click={formDialog.show}>open form dialog</Button>
    <Button on:click={confirmationDialog.show} color="red" variant="outlined"
      >delete confirm dialog</Button
    >

    <SelectInput
      direction="top"
      value={$form[`selectValue`]}
      error={$errors[`selectValue`]}
      on:select={({ detail }) => {
        $form[detail.name] = detail.option.value
      }}
      class="max-w-full p-2"
      inputClass="text-xs"
      name="selectValue"
      color="yellow"
      isRequired
      label="Select menu"
      options={[
        { label: `Apple`, value: `apple` },
        { label: `Banana`, value: `banana` },
        { label: `Orange`, value: `orange` },
        { label: `Pineapple`, value: `pineapple` },
        { label: `Strawberry`, value: `strawberry` },
        { label: `Watermelon`, value: `watermelon` },
        { label: `Monkey`, value: `monkey` },
        { label: `Money`, value: `money` },
        { label: `Dog`, value: `dog` }
      ]}
    />
    <MultiSelectInput
      direction="top"
      values={$form[`selectValues`]}
      error={$errors[`selectValues`].find((e) => !e)}
      on:select={({ detail }) => {
        $form[detail.name] = detail.options.map((o) => o.value)
      }}
      class="max-w-full p-2"
      inputClass="text-xs"
      name="selectValues"
      color="yellow"
      isRequired
      label="Multi Select menu"
      options={[
        { label: `Apple`, value: `apple` },
        { label: `Banana`, value: `banana` },
        { label: `Orange`, value: `orange` },
        { label: `Pineapple`, value: `pineapple` },
        { label: `Strawberry`, value: `strawberry` },
        { label: `Watermelon`, value: `watermelon` },
        { label: `Monkey`, value: `monkey` },
        { label: `Money`, value: `money` },
        { label: `Dog`, value: `dog` }
      ]}
    />

    <SelectInputEditDialog
      value={$form[`selectValue`]}
      error={$errors[`selectValue`]}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      class="max-w-full"
      name="selectValue"
      color="yellow"
      isRequired
      label="Select menu"
      options={[
        { label: `Apple`, value: `apple` },
        { label: `Banana`, value: `banana` },
        { label: `Orange`, value: `orange` },
        { label: `Pineapple`, value: `pineapple` },
        { label: `Strawberry`, value: `strawberry` },
        { label: `Watermelon`, value: `watermelon` },
        { label: `Monkey`, value: `monkey` },
        { label: `Money`, value: `money` },
        { label: `Dog`, value: `dog` }
      ]}
      mutation={sampleMutation}
      bind:dialog={editMenuDialog}
    />

    <div class="">
      <MultiSelectInputEditDialog
        values={$form[`selectValues`]}
        error={$errors[`selectValues`].find((e) => !e)}
        on:select={({ detail }) => {
          $form[detail.name] = detail.options.map((o) => o.value)
        }}
        isLoading={$sampleMutation.isLoading}
        on:submit={handleSubmit}
        class="max-w-full"
        name="selectValues"
        color="yellow"
        isRequired
        label="Multi Select menu"
        options={[
          { label: `Apple`, value: `apple` },
          { label: `Banana`, value: `banana` },
          { label: `Orange`, value: `orange` },
          { label: `Pineapple`, value: `pineapple` },
          { label: `Strawberry`, value: `strawberry` },
          { label: `Watermelon`, value: `watermelon` },
          { label: `Monkey`, value: `monkey` },
          { label: `Money`, value: `money` },
          { label: `Dog`, value: `dog` }
        ]}
        mutation={sampleMutation}
      />
    </div>

    <SelectInputEditDialog
      isInline
      error={$errors[`selectValue`]}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      bind:dialog={editMenuDialog}
    >
      {$form[`selectValue`] || `Select option`}
      <div slot="input">
        <SelectInputFetchData
          name="selectValue"
          label="Assigned To"
          isRequired
          value={$form[`selectValue`] || ``}
          on:select={({ detail }) => {
            $form[`selectValue`] = detail.option.value
          }}
        />
      </div>
    </SelectInputEditDialog>

    <div class="max-w-sm">
      <TextEditDialog
        isInline
        name="editableText"
        color="green"
        value={$form[`editableText`]}
        error={$errors[`editableText`]}
        isTouched={$touched[`editableText`]}
        on:change={handleChange}
        on:keyup={handleChange}
        isLoading={$sampleMutation.isLoading}
        on:submit={handleSubmit}
        label="Editable text"
        bind:dialog={editDialog}
      />
    </div>
    <TextEditDialog
      isInline
      type="color"
      name="color"
      color="green"
      value={$form[`color`]}
      error={$errors[`color`]}
      isTouched={$touched[`color`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable color"
      bind:dialog={editDialog}
    />
    <TextEditDialog
      isInline
      color="green"
      name="editableText"
      value={$form[`editableText`]}
      error={$errors[`editableText`]}
      isTouched={$touched[`editableText`]}
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
      value={$form[`createdAt`]}
      error={$errors[`createdAt`]}
      isTouched={$touched[`createdAt`]}
      on:pickDate={(e) => {
        console.log(e.detail)
        $form[`createdAt`] = e.detail.date
      }}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable date"
      bind:dialog={editDateDialog}
    />
    <TextareaEditDialog
      name="editableText"
      value={$form[`editableText`]}
      error={$errors[`editableText`]}
      isTouched={$touched[`editableText`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable text area"
      bind:dialog={editDialog}
    >
      <div slot="info">sdasdasd</div>
    </TextareaEditDialog>
    <ToggleEditDialog
      name="toggle"
      class="max-w-xs"
      value={$form[`toggle`]}
      error={$errors[`toggle`]}
      isTouched={$touched[`toggle`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isLoading={$sampleMutation.isLoading}
      on:submit={handleSubmit}
      label="Editable toggle"
      bind:dialog={editToggleDialog}
    />
    <ToggleEditDialog
      isInline
      class="max-w-xs"
      name="toggle"
      value={$form[`toggle`]}
      error={$errors[`toggle`]}
      isTouched={$touched[`toggle`]}
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
        <Button slot="trigger" on:click={onOpen} {...triggerProps} color="green" variant="outlined">
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
          variant="outlined"
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
    <Button class="" color="green" size="sm" variant="outlined"><PencilSquareIcon /></Button>
    <Button class="max-w-full" color="red" size="sm" variant="primary"><TrashIcon /></Button>
    <Button class="max-w-full" color="blue" size="sm" variant="outlined"><PlusIcon /></Button>
    <Button class="max-w-full" color="yellow" size="sm" variant="outlined"
      ><ClipboardDocumentIcon /></Button
    >
    <TextInput
      name="password"
      type="password"
      placeholder="password"
      class="max-w-full"
      isTouched={$touched[`password`]}
      value={$form[`password`]}
      error={$errors[`password`]}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <TextInput
      name="age"
      type="number"
      placeholder="number"
      isTouched={$touched[`age`]}
      value={$form[`age`]}
      error={$errors[`age`]}
      on:change={handleChange}
      on:keyup={handleChange}
    />
    <TextareaInput
      name="notes"
      placeholder="textarea"
      isTouched={$touched[`notes`]}
      value={$form[`notes`]}
      error={$errors[`notes`]}
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
    <Button on:click={dialog.hide} variant="outlined">close</Button>
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
  initialFocusID="passwordInput"
  submitLabel="Delete"
  submitColor="red"
>
  <Toaster />
  <div class="flex min-h-[26rem] flex-col gap-8">
    <Button
      on:click={() => {
        successToast(`Successfully edited something`)
      }}>Test Toast</Button
    >
    <DateInput
      isInline
      isRequired
      name="dob"
      type="date"
      label="Date of Birth"
      isTouched={$touched[`dob`]}
      value={$form[`dob`]}
      error={$errors[`dob`]}
      on:pickDate={(e) => {
        console.log(e.detail)
        $form[`dob`] = e.detail.date
      }}
      class="min-w-[16rem]"
    />
    <SelectInputFetchData
      name="selectValue"
      label="Assigned To"
      isRequired
      value={$form[`selectValue`] || ``}
      on:select={({ detail }) => {
        $form[`selectValue`] = detail.option.value
      }}
    />
    <SelectInput
      value={$form[`selectValue`]}
      error={$errors[`selectValue`]}
      on:select={({ detail }) => {
        $form[detail.name] = detail.option.value
      }}
      class="max-w-full p-2"
      inputClass="text-xs"
      name="selectValue"
      color="yellow"
      isRequired
      label="Select menu"
      options={[
        { label: `Apple`, value: `apple` },
        { label: `Banana`, value: `banana` },
        { label: `Orange`, value: `orange` },
        { label: `Pineapple`, value: `pineapple` },
        { label: `Strawberry`, value: `strawberry` },
        { label: `Watermelon`, value: `watermelon` },
        { label: `Monkey`, value: `monkey` },
        { label: `Money`, value: `money` },
        { label: `Dog`, value: `dog` }
      ]}
    />
    <TextInput
      id="passwordInput"
      type="password"
      label="Password"
      name="password"
      isTouched={$touched[`password`]}
      value={$form[`password`]}
      error={$errors[`password`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
    <DateInput
      name="dob"
      label="Date of Birth"
      isTouched={$touched[`dob`]}
      value={$form[`dob`]}
      error={$errors[`dob`]}
      on:change={handleChange}
    />

    <TextInput
      type="password"
      label="Confirm Password"
      name="confirmPassword"
      isTouched={$touched[`confirmPassword`]}
      value={$form[`confirmPassword`]}
      error={$errors[`confirmPassword`]}
      on:change={handleChange}
      on:keyup={handleChange}
      isRequired
      placeholder="required field"
    />
  </div>
</FormDialog>
