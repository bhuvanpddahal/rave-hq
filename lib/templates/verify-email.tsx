import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text
} from "@react-email/components";

import { TOKEN_EXPIRY_TIME_IN_MIN } from "@/constants";

interface VerifyEmailTemplateProps {
    token: string;
}

export default function VerifyEmailTemplate({
    token
}: VerifyEmailTemplateProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

    return (
        <Html>
            <Head />
            <Preview>RaveHQ Email Verification</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img src={`${baseUrl}/logo.png`} alt="RaveHQ Logo" className="h-[30px] w-auto" />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Verify your email address</Heading>
                            <Text style={mainText}>
                                Thanks for starting your RaveHQ account! We&apos;re excited to have you join our growing community of testimonial collectors and managers.
                                <br />
                                To make sure it&apos;s really you and keep your account secure, here&apos;s a verification code you can enter when prompted.
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>Verification code</Text>
                                <Text style={codeText}>{token}</Text>
                                <Text style={validityText}>
                                    (This code is valid for {TOKEN_EXPIRY_TIME_IN_MIN} minutes)
                                </Text>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                If you didn&apos;t intend to create a RaveHQ account, no worries! You can simply disregard this email.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        Copyright © {" "}
                        <Link href={baseUrl} target="_blank" style={link}>
                            RaveHQ
                        </Link>
                        {" "} {(new Date()).getFullYear()} - All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#fff",
    color: "#212121"
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee"
};

const h1 = {
    color: "#333",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px"
};

const link = {
    color: "#2754C5",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline"
};

const text = {
    color: "#333",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0"
};

const imageSection = {
    backgroundColor: "#ccc",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center"
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
    ...text,
    fontSize: "12px",
    padding: "0 20px",
    textAlign: "center" as const
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const
};

const codeText = {
    ...text,
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const
};

const verificationSection = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };