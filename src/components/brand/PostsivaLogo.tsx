import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const POSTSIVA_LOGO_SRC = "/uzair-detail/logo-postsiva.jpeg";

type PostsivaLogoProps = {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
};

const imageSizes = {
  sm: { box: "h-9 w-9", width: 36, height: 36 },
  md: { box: "h-10 w-10", width: 40, height: 40 },
  lg: { box: "h-12 w-12", width: 48, height: 48 },
};

export function PostsivaLogo({
  className,
  imageClassName,
  showText = true,
  href = "/",
  size = "md",
}: PostsivaLogoProps) {
  const dim = imageSizes[size];

  const content = (
    <>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/15",
          dim.box,
          imageClassName
        )}
      >
        <Image
          src={POSTSIVA_LOGO_SRC}
          alt="Postsiva Tech"
          width={dim.width}
          height={dim.height}
          className="h-full w-full object-contain p-0.5"
          priority
        />
      </span>
      {showText && (
        <span className="text-[#ffffff] font-extrabold text-lg sm:text-xl tracking-tight">
          Postsiva<span className="text-[#ffffff]/80 ml-1">Tech</span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("flex items-center gap-2.5 group w-fit", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("flex items-center gap-2.5", className)}>{content}</div>;
}
