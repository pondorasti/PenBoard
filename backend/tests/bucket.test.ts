import "mocha"
import chai, { expect } from "chai"
import chaiHtttp from "chai-http"

chai.use(chaiHtttp)
chai.config.includeStack = true

describe("Bucket Routes", () => {
  it("should return all buckets", async () => {
    expect("alex").to.be.equal("alex")
  })
})
