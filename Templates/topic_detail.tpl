<h1>Information on topic: 
	<span>
		<%= label %>
	</span>
</h1>
<p>Total mentions: 
	<span>
		<%= volume || 0 %>
	</span>
</p>
<p>Positive mentions: 
	<span class="positive-mention">
		<%= sentiment.positive || 0 %>
	</span>
</p>
<p>Neutral mentions: 
	<span class="neutral-mention">
		<%= sentiment.neutral || 0 %>
	</span>
</p>
<p>Negative mentions: 
	<span class="negative-mention">
		<%= sentiment.negative || 0 %>
	</span>
</p>
