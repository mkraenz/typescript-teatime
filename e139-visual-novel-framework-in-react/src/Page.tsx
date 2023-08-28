import { FC, useEffect } from "react";
import "./Page.css";
import { PageData, ServiceLocator } from "./data";

type Props = {
  data: PageData;
  nextPage: (page: string) => void;
  serviceLocator: ServiceLocator;
};

const Page: FC<Props> = ({
  data: { options, text, onEnter },
  nextPage,
  serviceLocator,
}) => {
  useEffect(() => {
    if (onEnter) onEnter(serviceLocator);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only rerun when onEnter changes
  }, [onEnter]);

  return (
    <div className="container">
      <p
        dangerouslySetInnerHTML={{
          __html: text,
        }}
        className="text"
      />
      <ol>
        {options.map((option, index) => (
          <li
            dangerouslySetInnerHTML={{
              __html: option.text,
            }}
            style={option.customStyle}
            className="option"
            key={index}
            onClick={async () => {
              await option.onConfirm?.(serviceLocator);
              nextPage(option.next);
            }}
          />
        ))}
      </ol>
    </div>
  );
};

export default Page;
