import { getVirtualFileSystemFromDirPath } from "npm:make-vfs"

type SearchOpts = Parameters<typeof getVirtualFileSystemFromDirPath>[0]

export const getSingleFileVFS = async (opts: SearchOpts) => {
  const vfs = await getVirtualFileSystemFromDirPath(opts)
  let singleFileContent: string[] = []

  for (const [path, content] of Object.entries(vfs)) {
    singleFileContent.push(`-----------\n${path}\n-----------\n${content}`)
  }

  return singleFileContent.join("\n\n")
}
