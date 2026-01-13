import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function EducationTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Your First Period</Text>
        <Text style={styles.subtitle}>
          Complete guide to understanding your menstrual cycle and health
        </Text>
      </View>

      {/* What is a Period */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="information" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>What is a Period?</Text>
        </View>
        <Text style={styles.bodyText}>
          A period (menstruation) is when your body sheds the lining of your uterus through your vagina. It typically lasts 3-7 days and happens roughly every 28 days, though cycles can vary from 21-35 days.
        </Text>
        <Text style={styles.bodyText}>
          This is a completely normal, healthy biological process. The blood you see is a mix of blood, tissue, and fluid.
        </Text>
      </View>

      {/* The Menstrual Cycle */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="sync" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>The Menstrual Cycle</Text>
        </View>
        <Text style={styles.bodyText}>
          Your menstrual cycle has 4 phases:
        </Text>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseName}>1. Menstruation (Days 1-5)</Text>
          <Text style={styles.phaseText}>
            Bleeding occurs as your body sheds the uterine lining. This is normal and healthy. Flow can vary from light to heavy.
          </Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseName}>2. Follicular Phase (Days 1-13)</Text>
          <Text style={styles.phaseText}>
            Your body prepares an egg for release. Estrogen levels rise. You may feel more energetic, social, and confident during this phase.
          </Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseName}>3. Ovulation (Day 14)</Text>
          <Text style={styles.phaseText}>
            A mature egg is released from the ovary. This is when pregnancy is most likely if you have unprotected sex. Some people experience mild pain on one side.
          </Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseName}>4. Luteal Phase (Days 15-28)</Text>
          <Text style={styles.phaseText}>
            If the egg is not fertilized, hormone levels drop. You may experience PMS symptoms. Your period begins again and the cycle repeats.
          </Text>
        </View>
      </View>

      {/* What is Normal */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>What is Normal?</Text>
        </View>
        <Text style={styles.bodyText}>
          Every person is different. Normal periods can include:
        </Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Period length: 2-7 days</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Cycle length: 21-35 days</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Flow: Light to heavy (varies daily)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Color: Bright red to dark brown</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Small clots are normal</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Mild to moderate cramping is common</Text>
        </View>
      </View>

      {/* PMS - Premenstrual Syndrome */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="alert-circle" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>PMS (Premenstrual Syndrome)</Text>
        </View>
        <Text style={styles.bodyText}>
          PMS is a group of symptoms that occur before your period due to hormonal changes. About 85% of people with periods experience some form of PMS.
        </Text>

        <Text style={styles.subheading}>Physical Symptoms:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Bloating and water retention</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Breast tenderness</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Headaches and migraines</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Fatigue and low energy</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Muscle aches</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Food cravings or appetite changes</Text>
        </View>

        <Text style={styles.subheading}>Emotional Symptoms:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Mood swings</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Irritability or anger</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Anxiety or worry</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Sadness or depression</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Difficulty concentrating</Text>
        </View>

        <Text style={styles.subheading}>Managing PMS:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Track symptoms using this app to find patterns</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Exercise regularly (even light walking helps)</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Eat nutritious foods and reduce salt/sugar</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Get adequate sleep (7-9 hours)</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Manage stress with meditation or breathing exercises</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Try over-the-counter pain relief if needed</Text>
        </View>
      </View>

      {/* PCOD and PCOS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="hospital-box" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>PCOD & PCOS</Text>
        </View>
        <Text style={styles.bodyText}>
          PCOD (Polycystic Ovarian Disease) and PCOS (Polycystic Ovary Syndrome) are related conditions affecting ovulation.
        </Text>

        <Text style={styles.subheading}>What They Are:</Text>
        <Text style={styles.bodyText}>
          These conditions affect the ovaries, causing them to produce excess androgens (male hormones). This disrupts ovulation and can cause irregular periods.
        </Text>

        <Text style={styles.subheading}>Common Symptoms:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Irregular or missed periods</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Heavy or prolonged bleeding</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Excess hair growth on face or body</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Acne or oily skin</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Weight gain or difficulty losing weight</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Dark patches on skin (especially armpits or neck)</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Thinning hair on scalp</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Fertility challenges</Text>
        </View>

        <Text style={styles.subheading}>Important:</Text>
        <Text style={styles.bodyText}>
          If you think you have PCOD/PCOS, consult a healthcare provider. These conditions can be managed with lifestyle changes, medication, or both. Early diagnosis and management are important.
        </Text>
      </View>

      {/* Period Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="shopping" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>Period Products Guide</Text>
        </View>

        {/* Pads */}
        <View style={styles.productBox}>
          <Text style={styles.productTitle}>Pads</Text>
          <Text style={styles.productSubtitle}>The Most Common Choice</Text>
          
          <Text style={styles.subheading}>How They Work:</Text>
          <Text style={styles.bodyText}>
            Pads are absorbent rectangles that stick to your underwear. The top layer wicks moisture away from your body.
          </Text>

          <Text style={styles.subheading}>Types of Pads:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Regular Pads</Text> - Good for light to medium flow</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Heavy Flow Pads</Text> - Extra absorbent, best for heavy days</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Winged Pads</Text> - Have flaps that wrap around underwear edges for security</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Traditional Pads</Text> - Made from synthetic materials</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Biodegradable Pads</Text> - Made from plant-based materials, eco-friendly, compostable</Text>
          </View>

          <Text style={styles.subheading}>How to Use:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>Remove the adhesive backing</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Center the pad on your underwear</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Press firmly to secure the wings (if present) under the edges</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.bulletText}>Change every 4-8 hours or when saturated</Text>
          </View>

          <Text style={styles.subheading}>Advantages:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Easy to use and comfortable</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Visible when saturated (easy to know when to change)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Good for beginners</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>No learning curve</Text>
          </View>

          <Text style={styles.subheading}>Disadvantages:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Can cause irritation or rash with prolonged use</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>May shift or move with certain activities</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Cannot be used while swimming</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Generates waste (though biodegradable options exist)</Text>
          </View>
        </View>

        {/* Tampons */}
        <View style={styles.productBox}>
          <Text style={styles.productTitle}>Tampons</Text>
          <Text style={styles.productSubtitle}>Internal Protection</Text>
          
          <Text style={styles.subheading}>How They Work:</Text>
          <Text style={styles.bodyText}>
            Tampons are small absorbent cylinders that you insert into your vagina to absorb menstrual blood before it leaves your body.
          </Text>

          <Text style={styles.subheading}>Types:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Applicator Tampons</Text> - Come with a plastic/cardboard tube to help insertion</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Non-Applicator (Digital)</Text> - Inserted with your finger</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Absorbency Levels</Text> - Light, regular, super, or ultra</Text>
          </View>

          <Text style={styles.subheading}>How to Use:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>Wash your hands</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Relax and find a comfortable position</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Insert at an angle toward your lower back (not straight up)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.bulletText}>Push the plunger (if applicator) to place it in</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>5.</Text>
            <Text style={styles.bulletText}>Leave the string outside for removal</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>6.</Text>
            <Text style={styles.bulletText}>Change every 4-8 hours, never leave for more than 8 hours</Text>
          </View>

          <Text style={styles.subheading}>Advantages:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Can be worn while swimming</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Less visible under clothes</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Good for sports and activities</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>No external leakage worries if inserted correctly</Text>
          </View>

          <Text style={styles.subheading}>Health Risks:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Toxic Shock Syndrome (TSS)</Text> - Rare but serious condition if left in too long (more than 8 hours)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Always use the lowest absorbency for your flow</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Never leave a tampon in overnight</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Vaginal irritation or infections possible</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>May cause dryness if absorbency is too high</Text>
          </View>

          <Text style={styles.subheading}>Safety Tips:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Change every 4-8 hours maximum</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Never sleep with a tampon in (use a pad instead)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Know TSS symptoms: fever, vomiting, rash, dizziness</Text>
          </View>
        </View>

        {/* Menstrual Cups */}
        <View style={styles.productBox}>
          <Text style={styles.productTitle}>Menstrual Cups</Text>
          <Text style={styles.productSubtitle}>Reusable & Eco-Friendly</Text>
          
          <Text style={styles.subheading}>How They Work:</Text>
          <Text style={styles.bodyText}>
            Small, flexible cups made of silicone or latex that you insert into your vagina. They collect menstrual blood instead of absorbing it.
          </Text>

          <Text style={styles.subheading}>How to Use:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>Wash hands and sterilize cup (boil before first use)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Fold the cup (various methods available)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Insert at an angle, lower than a tampon</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.bulletText}>Let it open and create a seal</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>5.</Text>
            <Text style={styles.bulletText}>Empty every 4-12 hours depending on flow</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>6.</Text>
            <Text style={styles.bulletText}>Wash cup and reinsert</Text>
          </View>

          <Text style={styles.subheading}>Advantages:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Reusable for 5-10 years (cost-effective)</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Environmentally friendly</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Can hold more than tampons or pads</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Lower TSS risk</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Can be worn while swimming</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Long-lasting (12 hours possible)</Text>
          </View>

          <Text style={styles.subheading}>Disadvantages:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Learning curve for insertion and removal</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Can be messy to empty</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Not ideal for public bathrooms without sink access</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>May cause discomfort if wrong size</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Upfront cost is higher</Text>
          </View>
        </View>

        {/* Period Underwear */}
        <View style={styles.productBox}>
          <Text style={styles.productTitle}>Period Underwear & Panty Liners</Text>
          <Text style={styles.productSubtitle}>Alternative Options</Text>
          
          <Text style={styles.subheading}>Period Underwear:</Text>
          <Text style={styles.bodyText}>
            Special underwear with built-in absorbent layers that work like pads but are more secure and less visible.
          </Text>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Advantages:</Text> Comfortable, reusable, no products to buy daily, washable, discrete</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Disadvantages:</Text> Expensive upfront, need multiple pairs, can stain if not treated quickly</Text>
          </View>

          <Text style={styles.subheading}>Panty Liners:</Text>
          <Text style={styles.bodyText}>
            Thin pads used for light flow or spotting between periods. Often used as backup with other products.
          </Text>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Advantages:</Text> Comfortable, less visible, good for light days, extra protection</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Disadvantages:</Text> Inadequate alone for heavy flow, creates waste</Text>
          </View>
        </View>
      </View>

      {/* Pain Relief Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="medical-bag" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>Pain Relief & Comfort</Text>
        </View>

        <View style={styles.resourceSection}>
            <Text style={styles.subheading}>Note:</Text>
            <Text style={styles.resourceText}>Please understand that everyone&#39;s body is different and our bodies may react to different things differently. What you see here is generic advice. It is recommended that you consult a trusted doctor and do your research before deciding whether you need to commit to something if necessary.</Text>
        </View>

        <Text style={styles.subheading}>Over-the-Counter Medications:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Ibuprofen (Advil, Motrin)</Text> - Reduces inflammation and pain. Best for cramps.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Naproxen (Aleve)</Text> - Longer-lasting pain relief, good for heavy days</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Acetaminophen (Tylenol)</Text> - Gentler pain relief, doesn&#39;t reduce inflammation</Text>
        </View>

        <Text style={styles.subheading}>Physical Relief Methods:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Heating Pads</Text> - Apply to lower abdomen or back for 15-20 minutes. Relieves muscle tension and cramps.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Warm Baths/Showers</Text> - Soothing and relaxing for sore muscles</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Massage</Text> - Gentle circular massage on lower abdomen helps with cramps</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Exercise</Text> - Light walking, stretching, or yoga increases blood flow and reduces pain</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Stretching</Text> - Child&#39;s pose, cat-cow, and other gentle poses help</Text>
        </View>

        <Text style={styles.subheading}>Lifestyle Changes:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Eat anti-inflammatory foods (leafy greens, fatty fish, nuts)</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Limit caffeine and salt</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Stay hydrated</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Get adequate sleep</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Manage stress with meditation or breathing exercises</Text>
        </View>
      </View>

      {/* What Others Can Do */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="heart" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>How Others Can Support You</Text>
        </View>

        <Text style={styles.subheading}>Family & Friends:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Comfort Foods</Text> - Make your favorite meals or snacks. Chocolate, warm soups, or comfort foods can help emotionally.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Offer Heating Pads</Text> - A warm heating pad is one of the best gifts during period discomfort</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Quiet Environment</Text> - Loud noises can make headaches worse. Reduce noise levels and let them rest.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Listen Without Judgment</Text> - Let them express how they&#39;re feeling without dismissing or minimizing their pain</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Help with Chores</Text> - Offer to do physical tasks they might find uncomfortable</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Give Space if Needed</Text> - Some people want company, others want solitude. Ask what they need.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Offer Pain Relief</Text> - Have over-the-counter pain medication available if they need it</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Plan Light Activities</Text> - Avoid strenuous exercise but suggest gentle walks or relaxation</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}><Text style={{fontWeight: '600'}}>Be Patient with Mood Changes</Text> - Remember that mood swings are real and temporary</Text>
        </View>

        <Text style={styles.subheading}>At School/Work:</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Understand that periods can affect concentration and pain levels</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Allow bathroom breaks without questioning</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Don&#39;t minimize menstrual pain as an excuse</Text>
        </View>
      </View>

      {/* When to See a Doctor */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="hospital-box" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
        </View>
        <Text style={styles.bodyText}>
          Contact a healthcare provider if you experience:
        </Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Severe pain not relieved by medication</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Bleeding lasting more than 7 days</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Unusually heavy bleeding (soaking a pad every hour)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>No period for 3 months (if sexually active)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Severe emotional changes or depression</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Signs of toxic shock syndrome (fever, rash, vomiting, dizziness)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Any concerns about your health</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Irregular or suddenly changing cycle</Text>
        </View>
      </View>

      {/* Using This App */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="calendar-heart" size={24} color="#E91E63" />
          <Text style={styles.sectionTitle}>Using This App</Text>
        </View>
        <Text style={styles.bodyText}>
          Track your periods to understand your unique cycle better. Log:
        </Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Flow intensity each day (1-5 scale)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Symptoms you experience (pain, physical, emotional)</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Your mood and energy levels</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Any notes about your health or concerns</Text>
        </View>

        <Text style={styles.bodyText}>
          Over time, patterns will emerge that help you prepare and manage your period better. Use this information to talk with healthcare providers about any concerns.
        </Text>
      </View>

      {/* Final Message */}
      <View style={styles.resourceSection}>
        <MaterialCommunityIcons name="heart" size={32} color="#E91E63" style={{textAlign: 'center', marginBottom: 12}} />
        <Text style={styles.resourceTitle}>Remember</Text>
        <Text style={styles.resourceText}>
          Your period is a normal, healthy part of life. Every person&#39;s cycle is unique. Be patient with yourself as your body develops. Don&#39;t hesitate to talk to a trusted adult or healthcare provider with any questions. You deserve support, understanding, and care during your menstrual cycle.
        </Text>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E91E63',
    flex: 1,
  },
  bodyText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 14,
    marginBottom: 8,
  },
  phaseBox: {
    backgroundColor: '#FFE0E6',
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  phaseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phaseText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  productBox: {
    backgroundColor: '#F9F9F9',
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
    borderRadius: 6,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 4,
  },
  bullet: {
    fontSize: 16,
    color: '#E91E63',
    marginRight: 10,
    fontWeight: 'bold',
    minWidth: 20,
  },
  bulletText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  resourceSection: {
    backgroundColor: '#FFF3E0',
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6F00',
    alignItems: 'center',
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 8,
  },
  resourceText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
});
