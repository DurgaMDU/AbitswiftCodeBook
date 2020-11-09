import { existsSync } from 'fs-extra'
import simplegit from 'simple-git/promise'

export class GitService {
  private git: simplegit.SimpleGit
  private readonly path: string
  private readonly repo: string

//Test via Git  editted by users testing

  constructor () {
    this.path = process.env.GIT_PATH
    this.repo = process.env.GIT_REPO

    if (!existsSync(this.path)) {
      simplegit().silent(true).clone(this.repo, this.path).catch()
    }

    this.git = simplegit(this.path).silent(true)
  }

  public async getLastVersion () {
	//To list lasters version of files
    await this.git.fetch()
    return this.git.pull('origin', 'master')
  }

  public getPath (): string {
    return this.path
  }
}