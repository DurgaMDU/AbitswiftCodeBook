import { existsSync } from 'fs-extra'
import simplegit from 'simple-git/promise'

export class GitService {
  private git: simplegit.SimpleGit
  private readonly path: string
  private readonly repo: string

//TEst via Git  editted

  constructor () {
    this.path = process.env.GIT_PATH
    this.repo = process.env.GIT_REPO

    if (!existsSync(this.path)) {
      simplegit().silent(true).clone(this.repo, this.path).catch()
    }

    this.git = simplegit(this.path).silent(true)
  }

  public async getLastVersion () {
    await this.git.fetch()
    return this.git.pull('origin', 'master')
  }

  public getPath (): string {
    return this.path
  }
}