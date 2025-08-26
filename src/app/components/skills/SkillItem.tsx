import "./skillitem.css";

export interface SkillItemProps {
	skill: string;
	children?: React.ReactNode;
}

/**
 * SkillItem displays a single skill with an optional icon or child element.
 *
 * @param {string} skill - The name of the skill to display.
 * @param {React.ReactNode} [children] - Optional icon or element to display alongside the skill.
 */
export default function SkillItem({ skill, children }: SkillItemProps) {
	return (
		<li className="c-skill-item" role="listitem">
			{children !== undefined && (
				<span className="c-skill-item-iconwrap">{children}</span>
			)}
			<span className="c-skill-item-label">{skill}</span>
		</li>
	);
}
