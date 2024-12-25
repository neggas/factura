"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface LayoutWrapperType {
  children: React.ReactElement;
}

const ClientSideWrapper = (props: LayoutWrapperType) => {
  const [showChild, setShowChild] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (props.children.props = router);
};

export default ClientSideWrapper;
