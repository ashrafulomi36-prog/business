"use client";

import dynamic from "next/dynamic";

const WorkflowScene = dynamic(() => import("@/components/WorkflowScene"), {
  ssr: false,
  loading: () => <div className="scene scene-loading" aria-label="Decorative workflow illustration" />,
});

export default function WorkflowSceneClient() {
  return <WorkflowScene />;
}
