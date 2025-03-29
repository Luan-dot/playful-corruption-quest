import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Newspaper, AlertTriangle, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Consequence } from "@/lib/consequences-system";

interface NewsHeadlineModalProps {
  newsEvents: Consequence[];
  onClose: () => void;
}

export function NewsHeadlineModal({
  newsEvents,
  onClose,
}: NewsHeadlineModalProps) {
  const [open, setOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (newsEvents.length > 0) {
      setOpen(true);
    }
  }, [newsEvents]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const moveToNextEvent = () => {
    if (currentEventIndex < newsEvents.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      handleClose();
    }
  };

  if (newsEvents.length === 0) return null;

  const currentEvent = newsEvents[currentEventIndex];
  const newsEvent = currentEvent.effect.newsEvent;

  if (!newsEvent) return null;

  // Format date to look like a real newspaper date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-none">
        <div className="bg-black text-white py-3 px-4 font-serif">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{newsEvent.source}</h2>
            <div className="flex items-center text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-2xl font-serif">
            {newsEvent.headline}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-gray-100">
              Breaking News
            </Badge>
            {currentEvent.effect.specialEvent?.type === "scandal" && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-800 border-red-200"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>Developing Story</span>
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="p-6 text-sm space-y-4">
          {/* Optional image */}
          {newsEvent.image && (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4 border">
              <Newspaper className="h-12 w-12 text-gray-400" />
            </div>
          )}

          <p className="leading-relaxed">{newsEvent.content}</p>

          <div className="text-xs text-muted-foreground italic">
            Consequences of your previous decisions are now affecting public
            perception and creating new challenges.
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3 w-3" />
              <span>Full Story</span>
            </Button>

            <Button onClick={moveToNextEvent} size="sm">
              {currentEventIndex < newsEvents.length - 1
                ? "Next Story"
                : "Close"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
