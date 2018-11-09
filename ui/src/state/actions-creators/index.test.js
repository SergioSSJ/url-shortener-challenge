import { GET_DELETE_TOKEN, CREATE_SHORT_URL } from "../actions";
import { createShortUrl, deleteUrl } from "../actions-creators";

describe("UserList", () => {
  it("createShortUrl return json with type and url", () => {
    const url = "some url";
    expect(JSON.stringify(createShortUrl(url))).toEqual(JSON.stringify({ type: CREATE_SHORT_URL, payload: url }));
  });
  
  it("deleteUrl return json with type and url", () => {
    const hash = "some hash";
    expect(JSON.stringify(deleteUrl(hash))).toEqual(JSON.stringify({ type: GET_DELETE_TOKEN, payload: hash }));
  });
});
