import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CustomizedBadges = ({
  children,
  badgeContent,
}: {
  children: React.ReactNode;
  badgeContent: number;
}) => {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={badgeContent} color="primary">
        {children}
      </StyledBadge>
    </IconButton>
  );
};
