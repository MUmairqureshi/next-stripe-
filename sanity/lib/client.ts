import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skDv5Dtn88YB0RbhtrWJt3brp87ufBcTmtp9DYgEFBRZLecuJqAlJLK2NtFbhycZEl9m7sxoaS0u3ersRecCUZBnkpdQ6jccySoIYM8HHBdi8h2IfZ2e9RRaAiFVssJCRel7X7j0wy0xQNYKHtJOM4GsogkukcogfGXCqt9lHsj5SxbQfDYM"
})
