# sprite v1.0.0
NodeJS로 만들었으며 스프라이트 이미지 생성을 도와주는 도구입니다.

## twolfson
<https://github.com/twolfson/spritesmith>

## CLI
````javascript
node sprite
````

## 패턴
- 이미지가 10픽셀 간격으로 생성된다.
- 세로형 이미지로 생성된다.
- ./images/sprite/#/dist에 png 파일과 css 파일이 생성된다.

## 규칙
1. sprite.js와 images 폴더가 형제 관계로 있어야 된다.
2. images 폴더 안에 sprite 폴더가 존재해야 한다. 
3. ./images/sprite/ 폴더 안에 원하는 폴더명으로 폴더를 만든다.
4. ./images/sprite/#/ 안에 이미지 파일의 파일명을 01.#, 02.#...으로 짓는다.

## 유지보수
PSD 파일이 있다면 손이 덜 가지만 PSD 파일이 없는 상태이고 이 도구를 이용하고 커팅 된 파일들을 유지하고 파일을 추가하면서 재 생성 한다면 스프라이트 이미지의 좌표값을 해치지 않고 형상 유지를 할 수 있다.