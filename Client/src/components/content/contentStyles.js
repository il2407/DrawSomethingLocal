import styled from "styled-components";

const media = {
  desktop: "@media(min-width: 1000px)",
};

export const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 20 px;
    font-weight: bold;
    color: gray;
    align-self: flex-start;
  }

  .boxWrap {
    width: 90%;
    justify-content:center ${media.desktop} {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
    }

    .cont {
      margin-top: 10px;
      width: 100%;
      height: 150px;
      background-color: #ffffcc;
    }
  }
`;
