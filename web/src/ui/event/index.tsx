import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Image,
  Title,
  Divider,
  List,
  Box,
} from "@mantine/core";
import type { TEvent } from "../../types";

interface EventCardProps {
  event: TEvent;
}

export function EventCard({ event }: EventCardProps) {
  const getFlagEmoji = (country: "germany" | "usa") => {
    return country === "germany" ? "🇩🇪" : "🇺🇸";
  };

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        borderColor: "var(--mantine-color-red-9)",
        backgroundColor: "var(--mantine-color-dark-7)",
      }}
    >
      <Stack gap="md">
        {/* Header with flag and date */}
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm">
            <Box
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--mantine-color-dark-6)",
                borderRadius: "var(--mantine-radius-sm)",
                border: "2px solid var(--mantine-color-red-8)",
                fontSize: "32px",
              }}
            >
              {event.alternativeFlag ? (
                <Image
                  src={event.alternativeFlag}
                  alt={`${event.country} flag`}
                  fit="cover"
                  w={48}
                  h={48}
                />
              ) : (
                getFlagEmoji(event.country)
              )}
            </Box>
            <div>
              <Text size="xs" c="dimmed">
                {event.date}
              </Text>
              {event.time && (
                <Text size="xs" c="red.6">
                  {event.time}
                </Text>
              )}
            </div>
          </Group>
          <Badge color="red" variant="filled">
            {event.country.toUpperCase()}
          </Badge>
        </Group>

        {/* Title */}
        <Title order={3} c="red.4">
          {event.title}
        </Title>

        {/* Cover image */}
        {event.cover && (
          <Image
            src={event.cover}
            alt={event.title}
            radius="sm"
            style={{
              border: "1px solid var(--mantine-color-red-9)",
            }}
          />
        )}

        {/* Paragraphs */}
        {event.parapgraphs && event.parapgraphs.length > 0 && (
          <Stack gap="sm">
            {event.parapgraphs.map((paragraph, index) => (
              <Text key={index} size="sm" c="gray.3">
                {paragraph}
              </Text>
            ))}
          </Stack>
        )}

        {/* Media */}
        {event.media && event.media.length > 0 && (
          <>
            <Divider color="red.9" />
            <Stack gap="md">
              {event.media.map((mediaItem, index) => (
                <Box key={index}>
                  {mediaItem.type === "image" ? (
                    <Image
                      src={mediaItem.src}
                      alt={mediaItem.title}
                      radius="sm"
                      style={{
                        border: "1px solid var(--mantine-color-red-9)",
                      }}
                    />
                  ) : (
                    <video
                      src={mediaItem.src}
                      controls
                      style={{
                        width: "100%",
                        borderRadius: "var(--mantine-radius-sm)",
                        border: "1px solid var(--mantine-color-red-9)",
                      }}
                    />
                  )}
                  <Text size="sm" fw={500} mt="xs" c="gray.2">
                    {mediaItem.title}
                  </Text>
                  {mediaItem.description && (
                    <Text size="xs" c="dimmed">
                      {mediaItem.description}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          </>
        )}

        {/* Sources */}
        {event.sources.length > 0 && (
          <>
            <Divider color="red.9" />
            <Box>
              <Text size="sm" fw={600} c="red.5" mb="xs">
                Sources
              </Text>
              <List size="xs" spacing="xs" c="gray.4">
                {event.sources.map((source, index) => (
                  <List.Item key={index}>
                    <Text
                      size="xs"
                      component="a"
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--mantine-color-red-6)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      {source}
                    </Text>
                  </List.Item>
                ))}
              </List>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
}
