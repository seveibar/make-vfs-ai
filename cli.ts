import { Command } from "cliffy"
import { getSingleFileVFS } from "./main.ts"

if (import.meta.main) {
  await new Command()
    .name("make-vfs-ai")
    .description("Make a virtual filesystem that can be fed to an AI")
    .version("v0.0.1")
    .option(
      "-t, --types <filetypes:string>",
      "Filetypes to included, comma-separated. By default, any text file is included"
    )
    .arguments(`<dir:string> <output:string>`)
    .action(async (options, ...args) => {
      const [dir, output] = args
      const singleFile = await getSingleFileVFS({
        dirPath: dir,
        extensions: options.types ? options.types.split(",") : undefined,
        contentFormat: "string",
      })
      Deno.writeFileSync(output, new TextEncoder().encode(singleFile))
    })
    .parse(Deno.args)
}
