"use client";

import { DisplayStyle } from "@/app/projects/[project]/model";
import { useEffect, useState } from "react";
import { getCurrentUser, User } from "@/app/user/helper/auth";
import styles from "./display_style_toggle.module.css";
import LoggedUsersTooltip from "@/app/components/logged_users_tooltip";
import { Range } from "@/app/projects/[project]/model";

export interface Display_style_toggle {
  selected: Range;
  handleChange: (value: Range) => void;
}

export const RangeToggle = ({
  selected,
  handleChange,
}: Display_style_toggle) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);

  const disabled = currentUser === null || !currentUser.isPro;
  const buttonStyles = disabled
    ? styles.button + " " + styles.disabled
    : styles.button;
  const buttonSelectedStyles = disabled
    ? styles.selected + " " + styles.button + " " + styles.disabled
    : styles.selected + " " + styles.button;

  return (
    <div className={styles.toggleGroup}>
      <button
        className={
          selected === Range.FOUR_MONTHS
            ? buttonSelectedStyles + " " + styles.first
            : styles.button + " " + styles.first
        }
        onClick={() => handleChange(Range.FOUR_MONTHS)}
      >
        4 Months
      </button>
      <button
        disabled={disabled}
        className={
          selected === Range.ONE_YEAR
            ? buttonSelectedStyles + " " + styles.third
            : buttonStyles + " " + styles.third
        }
        onClick={() => handleChange(Range.ONE_YEAR)}
      >
        <LoggedUsersTooltip display={disabled} proOnly={true}>
          <span>12 Months</span>
        </LoggedUsersTooltip>
      </button>
    </div>
  );
};
