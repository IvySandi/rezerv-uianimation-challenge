"use client";

import type { CSSProperties } from "react";
import type { WalkingAvatarProps } from "@/components/home/types/walkingAvatar.types";
import styles from "@/components/home/styles/walkingAvatar.module.css";

const classNames = (...classes: Array<string | false>) =>
  classes.filter(Boolean).join(" ");

export function WalkingAvatar({
  isBobbing,
  isWalking,
  shouldReduceMotion,
  walkDuration = "1s",
}: WalkingAvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={classNames(
        styles.walkingAvatar,
        !shouldReduceMotion && isBobbing && styles.idleBobbing,
        !shouldReduceMotion && isWalking && styles.walking,
      )}
      style={{ "--walk-duration": walkDuration } as CSSProperties}
    >
      <div className={styles.figure}>
        <span className={styles.hairBack} />
        <span className={styles.neck} />
        <span className={styles.head}>
          <span className={styles.hairFront} />
          <span className={classNames(styles.eye, styles.eyeLeft)} />
          <span className={classNames(styles.eye, styles.eyeRight)} />
          <span className={styles.smile} />
        </span>
        <span className={classNames(styles.arm, styles.armLeft)}>
          <span className={styles.hand} />
        </span>
        <span className={classNames(styles.arm, styles.armRight)}>
          <span className={styles.hand} />
        </span>
        <span className={styles.body}>
          <span className={styles.collar} />
          <span className={styles.bag} />
        </span>
        <span className={styles.shorts} />
        <span className={classNames(styles.leg, styles.legLeft)}>
          <span className={styles.shoe} />
        </span>
        <span className={classNames(styles.leg, styles.legRight)}>
          <span className={styles.shoe} />
        </span>
      </div>
    </div>
  );
}
