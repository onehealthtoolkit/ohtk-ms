import { ReactElement, useRef, useState } from "react";
import { usePopper } from "react-popper";

type Props = {
  text?: string;
  children: ReactElement;
};

const Tooltip: React.FC<Props> = ({ text, children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const arrowElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        { name: "arrow", options: { element: arrowElement.current } },
      ],
    }
  );

  return (
    <div>
      <div
        ref={referenceElement}
        onMouseLeave={() => setVisible(false)}
        onMouseOver={() => setVisible(true)}
      >
        {children}
      </div>
      <div
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
        role="tooltip"
        className={`${
          visible ? "visible" : "invisible"
        }  delay-500 absolute z-10  inline-block px-3 py-2 text-sm font-normal text-white bg-gray-700 rounded-lg shadow-sm opacity-90 tooltip`}
      >
        {text}
        <div
          ref={arrowElement}
          style={styles.arrow}
          {...attributes.arrow}
          className="tooltip-arrow"
          data-popper-arrow
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
