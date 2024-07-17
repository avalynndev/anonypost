"use client";

import * as React from "react";

import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootAnnuProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface AnnuProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const Annu = ({ children, ...props }: RootAnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Annu = isDesktop ? Dialog : Drawer;

  return <Annu {...props}>{children}</Annu>;
};

const AnnuTrigger = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <AnnuTrigger className={className} {...props}>
      {children}
    </AnnuTrigger>
  );
};

const AnnuClose = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <AnnuClose className={className} {...props}>
      {children}
    </AnnuClose>
  );
};

const AnnuContent = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <AnnuContent className={className} {...props}>
      {children}
    </AnnuContent>
  );
};

const AnnuDescription = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <AnnuDescription className={className} {...props}>
      {children}
    </AnnuDescription>
  );
};

const AnnuHeader = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <AnnuHeader className={className} {...props}>
      {children}
    </AnnuHeader>
  );
};

const AnnuTitle = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <AnnuTitle className={className} {...props}>
      {children}
    </AnnuTitle>
  );
};

const AnnuBody = ({ className, children, ...props }: AnnuProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const AnnuFooter = ({ className, children, ...props }: AnnuProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AnnuFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <AnnuFooter className={className} {...props}>
      {children}
    </AnnuFooter>
  );
};

export {
  Annu,
  AnnuTrigger,
  AnnuClose,
  AnnuContent,
  AnnuDescription,
  AnnuHeader,
  AnnuTitle,
  AnnuBody,
  AnnuFooter,
};
