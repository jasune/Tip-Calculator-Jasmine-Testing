describe("submitServerInfo", () => {
  beforeEach(() => {
    serverNameInput = { value: "John" };
    serverForm = { preventDefault: () => {} };
    allServers = {};
  });

  it("should add a new server to allServers object", () => {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers.server1.serverName).toEqual("John");
  });

  it("should increment serverId when a new server is added", () => {
    expect(serverId).toEqual(0);
    submitServerInfo();
    expect(serverId).toEqual(1);
  });

  it("should clear the server name input field after adding a server", () => {
    expect(serverNameInput.value).toEqual("John");
    submitServerInfo();
    expect(serverNameInput.value).toEqual("");
  });
});

describe("updateServerTable", () => {
  beforeEach(() => {
    serverTbody = { innerHTML: "" };
    allServers = {
      server1: {
        serverName: "John",
        tipAmt: 5
      },
      server2: {
        serverName: "Jane",
        tipAmt: 10
      }
    };
  });

  it("should update serverTable with correct number of rows", () => {
    updateServerTable();
    expect(serverTbody.children.length).toEqual(2);
  });

  it("should update serverTable with correct server names and tip averages", () => {
    updateServerTable();
    let firstRow = serverTbody.children[0];
    let secondRow = serverTbody.children[1];
    expect(firstRow.children[0].textContent).toEqual("John");
    expect(firstRow.children[1].textContent).toEqual("$2.50");
    expect(secondRow.children[0].textContent).toEqual("Jane");
    expect(secondRow.children[1].textContent).toEqual("$5.00");
  });
});