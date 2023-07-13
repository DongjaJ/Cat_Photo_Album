# 📌 7주차 과제[Mission6]

## 요구사항

* [X]  컴포넌트별로 state에 대한 정합성 체크를 전혀 하지 않는데, 이 부분을 보충해 주세요.
  * [X]  컴포넌트별로 올바르지 않은 state를 넣으면 오류가 발생하도록 해주세요.
* [X] 각 컴포넌트의 setState를 최적화하여 이전 상태와 비교해서 변경사항이 있을 때만 render 함수를 호출하도록 최적화를 해봅니다.
* [X] 루트 탐색 중이 아닌 경우, 백스페이스 키를 눌렀을 때 이전 경로로 이동하도록 만들어봅니다.

## 구현사항
### Validation
- 타입을 validation 함수를 정의하고 객체를 만들어 각 타입에 해당하는 함수에 접근했습니다.
- 그리고 어떤 변수의 정합성 테스트에서 에러가 났는지 알기 위해 변수의 이름도 같이 구해놓았습니다

src/App.js
```js
validateNodeArray({
  nodeArray: nextPaths,
  nodeArrayName: Object.keys({ nextPaths })[0],
});
``` 

src/utils/validation.js
```js
const isBoolean = (parameter) => typeof parameter === 'boolean';
const isArray = (parameter) => Array.isArray(parameter);
const isNullish = (parameter) => parameter == null;
const isString = (parameter) => typeof parameter === 'string';

const validateFunction = {
  BOOLEAN: isBoolean,
  ARRAY: isArray,
  NULLISH: isNullish,
  STRING: isString,
};

export function validate({ types, parameter, parameterName }) {
  const isValid = types.some((type) => {
    return validateFunction?.[type](parameter);
  });
  if (!isValid) throw new Error(`${parameterName} is inValid!`);
}
...
```

### state끼리 비교하기
- 이전 상태와 바꿀 상태가 같은 object끼리 비교하고 만약 같다면 early return해 render함수가 실행되지 않도록 했습니다.
- state의 크기와 depth가 작다고 판단해서 JSON.stringify를 이용해 객체를 문자열로 변경해서 비교했습니다.

src/util/helper.js
```js
export function isSameObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
```

src/core/Component.js
```js
...
setState(newState) {
    const prevState = this.state;
    const nextState = { ...prevState, ...newState };
    if (isSameObject(prevState, nextState)) return;
    this.state = nextState;
    this.render();
  }
...
```

### 백스페이스 키를 눌렀을때 이전 경로로 이동하기
처음엔 nodes 컴포넌트에서 이벤트를 등록하려고 했는데 리렌더링 될때마다 window에 이벤트가 쌓여서 App 컴포넌트에서 이벤트를 등록했습니다.

src/App.js
```js
setEvent() {
   ...

    window.addEventListener('keyup', ({ key }) => {
      key === 'Escape' && this.handleCloseImage();
    });
  }
```
