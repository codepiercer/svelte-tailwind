import toast from "svelte-french-toast"

export function successToast(message) {
  return toast.success(message, {
    duration: 6000,
    style: `border-radius: 14px; background: #333; color: #fff;`
  })
}
