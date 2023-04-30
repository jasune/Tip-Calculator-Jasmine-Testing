describe("sumPaymentTotal()", function() {
  it("should return a number", function() {
    const result = sumPaymentTotal("billAmt");
    expect(result).toEqual(jasmine.any(Number));
  });
});

describe("calculateTipPercent()", function() {
  it("should return a number", function() {
    const result = calculateTipPercent(100, 20);
    expect(result).toEqual(jasmine.any(Number));
  });
});

describe("appendTd()", function() {
  it("should add a td element to the given tr element", function() {
    const tr = document.createElement("tr");
    appendTd(tr, "test");
    expect(tr.childNodes.length).toEqual(1);
    expect(tr.childNodes[0].innerText).toEqual("test");
  });
});

describe("appendDeleteBtn()", function() {
  it("should add a delete button to the given tr element", function() {
    const tr = document.createElement("tr");
    appendDeleteBtn(tr, "test");
    expect(tr.childNodes.length).toEqual(1);
    expect(tr.childNodes[0].className).toEqual("deleteBtn");
    expect(tr.childNodes[0].innerText).toEqual("X");
  });
});

describe("removeEle()", function() {
  it("should remove the given element from the DOM and allServers object", function() {
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    tr.id = "test-id";
    table.appendChild(tr);
    document.body.appendChild(table);

    allServers["test-id"] = { name: "test" };

    removeEle({ target: { closest: () => tr } });

    expect(table.childNodes.length).toEqual(0);
    expect(allServers["test-id"]).toBeUndefined();
  });
});