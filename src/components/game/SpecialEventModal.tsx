import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Search,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Consequence } from "@/lib/consequences-system";

interface SpecialEventModalProps {
  specialEvents: Consequence[];
  onClose: () => void;
  onHandleEvent: (eventType: string, eventId: string) => void;
}

export function SpecialEventModal({
  specialEvents,
  onClose,
  onHandleEvent,
}: SpecialEventModalProps) {
  const [open, setOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (specialEvents.length > 0) {
      setOpen(true);
    }
  }, [specialEvents]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleEvent = () => {
    const currentEvent = specialEvents[currentEventIndex];
    if (currentEvent.effect.specialEvent) {
      onHandleEvent(currentEvent.effect.specialEvent.type, currentEvent.id);
    }
    handleClose();
  };

  if (specialEvents.length === 0) return null;

  const currentEvent = specialEvents[currentEventIndex];
  const specialEvent = currentEvent.effect.specialEvent;

  if (!specialEvent) return null;

  // Choose icon based on event type
  const getEventIcon = () => {
    switch (specialEvent.type) {
      case "investigation":
        return <Search className="h-12 w-12 text-blue-500" />;
      case "confrontation":
        return <Users className="h-12 w-12 text-red-500" />;
      case "opportunity":
        return <Briefcase className="h-12 w-12 text-green-500" />;
      case "scandal":
        return <AlertTriangle className="h-12 w-12 text-orange-500" />;
      default:
        return <MessageSquare className="h-12 w-12 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader className="space-y-3">
          <div className="mx-auto">{getEventIcon()}</div>
          <DialogTitle className="text-center text-xl">
            {specialEvent.content.title}
          </DialogTitle>
        </DialogHeader>

        <div className="my-4 text-center">
          <p>{specialEvent.content.description}</p>
        </div>

        <div className="p-4 bg-gray-50 border rounded-md text-sm text-muted-foreground">
          <p>
            This event has emerged as a consequence of your earlier decisions.
            How you respond may have further ripple effects on your career and
            reputation.
          </p>
        </div>

        <DialogFooter className="mt-4 flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Ignore for Now
          </Button>
          <Button onClick={handleEvent} className="flex-1">
            Address the Situation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
