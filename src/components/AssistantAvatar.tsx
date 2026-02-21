const AssistantAvatar = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-2xl bg-primary flex items-center justify-center flex-shrink-0"
    style={{ width: size, height: size }}
  >
    <span className="text-primary-foreground font-extrabold" style={{ fontSize: size * 0.45 }}>
      🌱
    </span>
  </div>
);

export default AssistantAvatar;
