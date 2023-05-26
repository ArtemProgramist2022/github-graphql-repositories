export type ReposItem = {
  owner: ReposOwner
  name: string
  stargazerCount: number
  pushedAt: string
  url: string
  languages: ReposLanguages
  shortDescriptionHTML: string
}

export type ReposOwner = {
  login: string
  avatarUrl: string
  url: string
}

export type ReposLanguages = {
  nodes: ReposLanguageNode[]
}

export type ReposLanguageNode = {
  color: string
  name: string
}

export type GetRepositoryResponse = {
  repository: ReposItem
}

export type GetRepositoryParams = {
  name: string
  owner: string
}
