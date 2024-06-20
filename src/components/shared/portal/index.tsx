import { FC, useMemo } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  containerId: string;
};

const Portal: FC<Props> = ({
  children,
  containerId,
}) => {
  const container = useMemo(() => {
    let portalRoot = document.getElementById(containerId);
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = containerId;
      document.body.appendChild(portalRoot);
    }
    return portalRoot;
  }, [containerId]);

  return createPortal(children, container);
};

export default Portal;
