"use client";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SearchResponse } from "./CardList";

interface ModalOpenProps {
  obj: SearchResponse;
  openModal: number | null;
  handleModalClose: (e: React.MouseEvent) => void;
}
export default function ModalCard({
  obj,
  openModal,
  handleModalClose,
}: ModalOpenProps) {
  return (
    <Modal
      open={openModal === obj.id}
      className="flex justify-center items-center gap-5"
    >
      <Paper className="p-5 relative">
        <IconButton
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            top: "-25%",
            right: { sm: -35, xs: -13 },
          }}
        >
          <CloseIcon className="text-cyan-400" />
        </IconButton>
        <Typography variant="h2" sx={{ fontSize: 30 }}>
          {obj.first_name + " " + obj.last_name}
        </Typography>
        <Divider />
        <Box className="my-2.5">
          <Typography>
            <b>Email: </b> <a href={`mailto:${obj.email}`}>{obj.email}</a>
          </Typography>
          <Typography>
            <b>Gender: </b> {obj.gender}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
}
