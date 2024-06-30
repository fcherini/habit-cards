import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Txt } from "@/components/StyledText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Txt type="title">Explore</Txt>
      </ThemedView>
      <Txt>This app includes example code to help you get started.</Txt>
      <Collapsible title="File-based routing">
        <Txt>
          This app has two screens:{" "}
          <Txt type="subtitle">app/(tabs)/index.tsx</Txt> and{" "}
          <Txt type="subtitle">app/(tabs)/explore.tsx</Txt>
        </Txt>
        <Txt>
          The layout file in <Txt type="subtitle">app/(tabs)/_layout.tsx</Txt>{" "}
          sets up the tab navigator.
        </Txt>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Txt type="link">Learn more</Txt>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Txt>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Txt type="subtitle">w</Txt> in the terminal
          running this project.
        </Txt>
      </Collapsible>
      <Collapsible title="Images">
        <Txt>
          For static images, you can use the <Txt type="subtitle">@2x</Txt> and{" "}
          <Txt type="subtitle">@3x</Txt> suffixes to provide files for different
          screen densities
        </Txt>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Txt type="link">Learn more</Txt>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <Txt>
          Open <Txt type="subtitle">app/_layout.tsx</Txt> to see how to load{" "}
          <Txt style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </Txt>
        </Txt>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Txt type="link">Learn more</Txt>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Txt>
          This template has light and dark mode support. The{" "}
          <Txt type="subtitle">useColorScheme()</Txt> hook lets you inspect what
          the user's current color scheme is, and so you can adjust UI colors
          accordingly.
        </Txt>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Txt type="link">Learn more</Txt>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Txt>
          This template includes an example of an animated component. The{" "}
          <Txt type="subtitle">components/TimeCard.tsx</Txt> component uses the
          powerful <Txt type="subtitle">react-native-reanimated</Txt> library to
          create a waving hand animation.
        </Txt>
        {/* {Platform.select({
          web: (
            <Txt>
              The <Txt type="subtitle">components/ParallaxScrollView.tsx</Txt>{" "}
              component provides a parallax effect for the header image.
            </Txt>
          ),
        })} */}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
