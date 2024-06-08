// 1번 문제
const loginBtnDom = document.getElementById("theaterLoginBtn");

loginBtnDom.addEventListener("click", loginValidationCheck);

function loginValidationCheck() {
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;

  console.log(email, pw);

  if (isEmpty(email) || isEmpty(pw)) {
    alert("이메일 혹은 비밀번호가 입력되지 않았습니다.");
    return;
  }

  if (!emailValidationCheck(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }

  const pwCheckResult = passwordValidationCheck(pw);

  if (pwCheckResult.result === "FAIL") {
    alert(pwCheckResult.message);
    return;
  }

  alert("로그인 성공!");
}

function isEmpty(str) {
  return !str || str.length === 0;
}

function emailValidationCheck(email) {
  const regex = /^[A-Za-z0-9.]+@[a-z0-9._-]+\.co$/;

  return regex.test(email);
}

function passwordValidationCheck(pw) {
  let returnObj = {
    result: "OK",
    message: "",
  };

  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@~])[A-Za-z\d!@~]{8,20}$/;

  if (pw.length < 7 || pw.length > 20) {
    returnObj.result = "FAIL";
    returnObj.message =
      "비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.";
  } else if (!regex.test(pw)) {
    returnObj.result = "FAIL";
    returnObj.message =
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
  }

  return returnObj;
}

const btnDomArray = document.querySelectorAll(".btn");
const generalBtnDomArray = document.querySelectorAll(".--general");
const youthBtnDomArray = document.querySelectorAll(".--youth");

const seatDomArray = document.querySelectorAll(".seat");
const normalDomArray = Array.from(seatDomArray).filter(
  (dom) =>
    !dom.className.includes("musseukbox") && !dom.className.includes("handicap")
);
const mussDomArray = Array.from(seatDomArray).filter((dom) =>
  dom.className.includes("musseukbox")
);
const handicapSeatDomArray = Array.from(seatDomArray).filter((dom) =>
  dom.className.includes("handicap")
);

const handicapDom = document.getElementById("checkHandicap");

const remainCountDom = document.getElementById("remainSeatCnt");
const amountDom = document.getElementById("amount");

document.getElementById("reselect").addEventListener("click", function () {
  if (window.confirm("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?")) {
    selectionMap.init();
    seatMap.init();
  }
});

const generalFee = 10000;
const youthFee = 7000;
const handicapFee = 5000;
const mussDiscount = 0.2;

const wholeSeatCount = 39;

let seatSelectedCount = 0;
let normalSeatSelectedCount = 0;
let mussSeatSelectedCount = 0;
let handicapSeatSelectedCount = 0;
// let totalCount = 0;
let generalCount = 0;
let youthCount = 0;

let selectionMap = {
  general: {
    count: 0,
    domArray: generalBtnDomArray,
  },
  youth: {
    count: 0,
    domArray: youthBtnDomArray,
  },

  getTotalCount: function () {
    return this.general.count + this.youth.count;
  },

  init: function () {
    generalBtnDomArray.forEach((dom) => {
      dom.className = dom.className.replace(" toggle", "");
    });
    youthBtnDomArray.forEach((dom) => {
      dom.className = dom.className.replace(" toggle", "");
    });
    generalBtnDomArray[0].className =
      generalBtnDomArray[0].className + " toggle";
    youthBtnDomArray[0].className = youthBtnDomArray[0].className + " toggle";
    checkHandicap.disabled = true;
  },

  update: function (type, count) {
    this[type].count = count;

    if (!handicapDom.checked) {
      const discount = seatMap.count.muss > 0 ? 0.8 : 1;
      const seatSelectedCount = seatMap.getTotalCount();
      console.log(seatSelectedCount, this.general.count);
      if (seatSelectedCount > this.general.count) {
        amountDom.textContent =
          discount *
          (this.general.count * generalFee +
            (seatSelectedCount - this.general.count) * youthFee);
      } else {
        amountDom.textContent = discount * seatSelectedCount * generalFee;
      }
    }
  },
};

let seatMap = {
  domArray: {
    normal: normalDomArray,
    muss: mussDomArray,
    handicap: handicapSeatDomArray,
  },
  count: {
    normal: 0,
    muss: 0,
    handicap: 0,
  },
  init: function () {
    const disabled = selectionMap.getTotalCount() === 0 ? " disabled" : "";
    seatDomArray.forEach((dom) => {
      if (dom.className.includes("musseukbox")) {
        dom.className = "seat musseukbox" + disabled;
      } else if (dom.className.includes("handicap")) {
        dom.className = "seat handicap" + disabled;
      } else {
        dom.className = "seat" + disabled;
      }
    });

    this.count.normal = 0;
    this.count.muss = 0;
    this.count.handicap = 0;
    remainCountDom.textContent = 0;
    amountDom.textContent = 0; //
  },
  getTotalCount: function () {
    return this.count.normal + this.count.muss + this.count.handicap;
  },
  getOtherDomArray: function (type) {
    const keys = Object.keys(this.domArray).filter((v) => v !== type);

    return keys.map((v) => this.domArray[v]);
  },
  increase: function (type) {
    this.count[type]++;
    remainCountDom.textContent = wholeSeatCount - this.getTotalCount();

    const amount = parseInt(amountDom.textContent);

    if (type === "handicap") {
      amountDom.textContent = amount + handicapFee;
    } else {
      const discount = type === "muss" ? 0.8 : 1;

      if (this.getTotalCount() <= selectionMap.general.count) {
        amountDom.textContent = amount + generalFee * discount;
      } else {
        amountDom.textContent = amount + youthFee * discount;
      }
    }
  },
  decrease: function (type) {
    this.count[type]--;
    remainCountDom.textContent = wholeSeatCount - this.getTotalCount();

    const amount = parseInt(amountDom.textContent);

    if (type === "handicap") {
      amountDom.textContent = amount - handicapFee;
    } else {
      const discount = type === "muss" ? 0.8 : 1;

      if (this.getTotalCount() >= selectionMap.general.count) {
        amountDom.textContent = amount - youthFee * discount;
      } else {
        amountDom.textContent = amount - generalFee * discount;
      }
    }
  },
  makeDomArrayDisabled: function (type) {
    this.domArray[type].forEach((dom) => {
      makeDisabled(dom);
    });
  },
  makeDomArrayActivate: function (type) {
    const otherTypes = ["normal", "muss", "handicap"].filter((v) => v !== type);

    if (otherTypes.filter((v) => v !== type && this.count[v] > 0).length > 0) {
      return;
    }

    this.domArray[type].forEach((dom) => {
      removeDisabled(dom);
    });

    otherTypes.forEach((otherType) => {
      this.makeDomArrayDisabled(otherType);
    });
  },
};

function removeDisabled(dom) {
  dom.className = dom.className.replace(" disabled", "");
}

function makeDisabled(dom) {
  if (!dom.className.includes("disabled")) {
    dom.className = dom.className + " disabled";
  }
}

function removeClicked(dom) {
  dom.className = dom.className.replace(" clicked", "");
}

function makeClicked(dom) {
  if (!dom.className.includes("clicked")) {
    dom.className = dom.className + " clicked";
  }
}

selectionMap.init();

// 먼저 해당 dom 을 활성화시키고
// 다른 dom을 비활성화시킨 다음
// 좌석들을 활성화시킨다.
for (let i = 0; i < btnDomArray.length; i++) {
  btnDomArray[i].addEventListener("click", function (event) {
    const className = event.target.className;
    const count = parseInt(event.target.textContent);
    const type = className.includes("general") ? "general" : "youth";
    if (
      selectionMap[className.includes("general") ? "youth" : "general"].count +
        count <
        seatMap.getTotalCount() &&
      seatMap.getTotalCount() > 0
    ) {
      window.alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");

      selectionMap.update(type, count);
      seatMap.init();
    }

    selectionMap.update(type, count);

    // 장애인 체크 여부
    if (
      selectionMap.general.count >= 4 ||
      selectionMap.youth.count >= 4 ||
      selectionMap.getTotalCount() >= 4
    ) {
      if (handicapDom.checked) {
        window.alert(
          "머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요."
        );
        return;
      }
      handicapDom.disabled = true;
    } else if (selectionMap.getTotalCount() >= 1) {
      handicapDom.disabled = false;
    }

    event.target.className = className + " toggle";

    if (className.includes("general")) {
      for (let j = 0; j < generalBtnDomArray.length; j++) {
        if (j === count) continue;
        generalBtnDomArray[j].className = generalBtnDomArray[
          j
        ].className.replace(" toggle", "");
      }
    } else {
      for (let j = 0; j < youthBtnDomArray.length; j++) {
        if (j === count) continue;
        youthBtnDomArray[j].className = youthBtnDomArray[j].className.replace(
          " toggle",
          ""
        );
      }
    }

    if (seatMap.getTotalCount() === 0 && selectionMap.getTotalCount() > 0) {
      seatDomArray.forEach((dom) => {
        removeDisabled(dom);
      });
    } else {
      if (seatMap.getTotalCount() === selectionMap.getTotalCount()) {
        seatDomArray.forEach((dom) => {
          if (!dom.className.includes("clicked")) {
            makeDisabled(dom);
          }
        });
      } else {
        ["normal", "muss", "handicap"].forEach((seatType) => {
          const selectedCount = seatMap.count[seatType];

          if (selectedCount > 0) {
            seatMap.makeDomArrayActivate(seatType);
          }
        });
      }
    }
  });
}

handicapDom.addEventListener("click", function (event) {
  if (!event.target.checked) {
    let isReturn = false;

    handicapSeatDomArray.forEach((dom) => {
      const className = dom.className;
      if (className.includes("clicked")) {
        window.alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
        seatMap.init();
        isReturn = true;
        return;
      }
    });

    seatMap.init();
  } else {
    normalDomArray.forEach((dom) => {
      makeDisabled(dom);
    });

    mussDomArray.forEach((dom) => {
      makeDisabled(dom);
    });
  }
});

seatDomArray.forEach((dom) => {
  dom.addEventListener("click", function (event) {
    const className = event.target.className;
    if (className.includes("disabled")) return;
    const checked = className.includes("clicked");
    let type = null;

    if (className.includes("musseukbox")) {
      type = "muss";
    } else if (className.includes("handicap")) {
      type = "handicap";
    } else {
      type = "normal";
    }

    if (className.includes("disabled")) return;
    if (type === "handicap" && !handicapDom.checked) {
      window.alert(
        "선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다."
      );
      return;
    }

    if (!checked) {
      makeClicked(event.target);
      seatMap.increase(type);
    } else {
      removeClicked(event.target);
      seatMap.decrease(type);
    }

    if (seatMap.getTotalCount() === selectionMap.getTotalCount()) {
      seatDomArray.forEach((dom) => {
        if (!dom.className.includes("clicked")) {
          makeDisabled(dom);
        }
      });
    } else {
      seatMap.domArray[type].forEach((dom) => {
        removeDisabled(dom);
      });

      seatMap.getOtherDomArray(type).forEach((otherDomArray) => {
        otherDomArray.forEach((dom) => {
          if (seatMap.count[type] > 0) {
            makeDisabled(dom);
          } else if (seatMap.count[type] === 0) {
            removeDisabled(dom);
          }
        });
      });
    }

    if (["normal", "muss"].includes(type)) {
      if (seatMap.count[type] > 0) {
        handicapDom.disabled = true;
      } else if (seatMap.count[type] === 0) {
        handicapDom.disabled = false;
      }
    }
  });
});
