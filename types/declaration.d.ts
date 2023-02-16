declare module '*.css' {
  const styles: { [key: string]: string };
  export = styles;
};

interface Event {
  __isClicked: boolean;
}

declare module '*.png' {
  const content: any;
  export default content;
}
